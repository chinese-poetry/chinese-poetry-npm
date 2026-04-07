#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 中文目录名到拼音的映射
const directoryMapping = {
  '楚辞': 'chuci',
  '御定全唐詩': 'yudingquantangshi',
  '四书五经': 'sishuwujing',
  '论语': 'lunyu',
  '全唐诗': 'quantangshi',
  '纳兰性德': 'nalanxingde',
  '元曲': 'yuanqu',
  '水墨唐诗': 'shuimotangshi',
  '曹操诗集': 'caocaoshiji',
  '宋词': 'songci',
  '蒙学': 'mengxue',
  '诗经': 'shijing',
  '五代诗词': 'wudaishici',
  '幽梦影': 'youmengying',
  'rank': 'rank',
  'strains': 'strains'
};

// 计算文件的SHA256哈希值
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// 获取文件信息
function getFileInfo(filePath) {
  const stat = fs.statSync(filePath);
  return {
    size: stat.size,
    mtime: stat.mtime.toISOString(),
    hash: getFileHash(filePath)
  };
}

// 扫描并收集所有JSON文件信息
function collectJsonFiles(srcDir, relativePath = '', fileMap = new Map()) {
  if (!fs.existsSync(srcDir)) {
    return fileMap;
  }

  const items = fs.readdirSync(srcDir);
  
  items.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      const newRelativePath = relativePath ? path.join(relativePath, item) : item;
      collectJsonFiles(srcPath, newRelativePath, fileMap);
    } else if (path.extname(item) === '.json') {
      const relativeFilePath = relativePath ? path.join(relativePath, item) : item;
      fileMap.set(relativeFilePath, {
        fullPath: srcPath,
        ...getFileInfo(srcPath)
      });
    }
  });
  
  return fileMap;
}

// 加载之前的manifest
function loadManifest(manifestPath) {
  if (fs.existsSync(manifestPath)) {
    try {
      return new Map(Object.entries(JSON.parse(fs.readFileSync(manifestPath, 'utf8'))));
    } catch (error) {
      console.log('Warning: Could not load previous manifest, starting fresh');
    }
  }
  return new Map();
}

// 比较文件变更
function compareFiles(currentFiles, previousFiles) {
  const changes = {
    added: [],
    modified: [],
    deleted: [],
    unchanged: []
  };

  // 检查新增和修改的文件
  for (const [filePath, currentInfo] of currentFiles) {
    if (!previousFiles.has(filePath)) {
      changes.added.push(filePath);
    } else {
      const previousInfo = previousFiles.get(filePath);
      if (currentInfo.hash !== previousInfo.hash) {
        changes.modified.push({
          path: filePath,
          oldSize: previousInfo.size,
          newSize: currentInfo.size,
          oldMtime: previousInfo.mtime,
          newMtime: currentInfo.mtime
        });
      } else {
        changes.unchanged.push(filePath);
      }
    }
  }

  // 检查删除的文件
  for (const filePath of previousFiles.keys()) {
    if (!currentFiles.has(filePath)) {
      changes.deleted.push(filePath);
    }
  }

  return changes;
}

// 主函数 - 只检查变更，不复制文件
function main() {
  console.log('🔍 Checking for changes in chinese-poetry directory...\n');
  
  const sourceRoot = path.join(__dirname, '..', 'chinese-poetry');
  const manifestPath = path.join(__dirname, '..', '.poetry-manifest.json');
  
  // 收集当前所有JSON文件信息
  const currentFiles = new Map();
  Object.entries(directoryMapping).forEach(([chineseDir, pinyinDir]) => {
    const srcPath = path.join(sourceRoot, chineseDir);
    const dirFiles = collectJsonFiles(srcPath, pinyinDir);
    for (const [filePath, fileInfo] of dirFiles) {
      currentFiles.set(filePath, fileInfo);
    }
  });

  console.log(`📊 Found ${currentFiles.size} JSON files in chinese-poetry directory\n`);

  // 加载之前的manifest
  const previousFiles = loadManifest(manifestPath);
  
  if (previousFiles.size === 0) {
    console.log('📋 No previous manifest found. This appears to be the first run.');
    console.log('   Run `npm start` to create initial copy and manifest.\n');
    return;
  }
  
  // 比较变更
  const changes = compareFiles(currentFiles, previousFiles);
  
  // 显示变更报告
  console.log('📋 Change Report:');
  console.log('================');
  
  if (changes.added.length > 0) {
    console.log(`\n✅ Added files (${changes.added.length}):`);
    changes.added.forEach(file => console.log(`   + ${file}`));
  }
  
  if (changes.modified.length > 0) {
    console.log(`\n📝 Modified files (${changes.modified.length}):`);
    changes.modified.forEach(change => {
      const sizeDiff = change.newSize - change.oldSize;
      const sizeInfo = sizeDiff !== 0 ? ` (${sizeDiff > 0 ? '+' : ''}${sizeDiff} bytes)` : '';
      console.log(`   * ${change.path}${sizeInfo}`);
    });
  }
  
  if (changes.deleted.length > 0) {
    console.log(`\n❌ Deleted files (${changes.deleted.length}):`);
    changes.deleted.forEach(file => console.log(`   - ${file}`));
  }
  
  console.log(`\n⏸️  Unchanged files: ${changes.unchanged.length}`);
  
  const totalChanges = changes.added.length + changes.modified.length + changes.deleted.length;
  
  if (totalChanges === 0) {
    console.log('\n🎉 No changes detected! All files are up to date.');
    process.exit(0);
  } else {
    console.log(`\n🔄 Total changes detected: ${totalChanges} files`);
    console.log('\n💡 Run `npm start` to update the dist directory with these changes.');
    process.exit(1); // Exit with error code to indicate changes detected
  }
}

main();