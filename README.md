# chinese-poetry

[![](https://img.shields.io/github/issues/chinese-poetry/chinese-poetry-npm.svg)](https://github.com/chinese-poetry/chinese-poetry-npm/issues) [![](https://img.shields.io/github/forks/chinese-poetry/chinese-poetry-npm.svg)](https://github.com/chinese-poetry/chinese-poetry-npm/network) [![](https://img.shields.io/github/stars/chinese-poetry/chinese-poetry-npm.svg)](https://github.com/chinese-poetry/chinese-poetry-npm/stargazers) ![](http://jaywcjlove.github.io/sb/status/no-dependencies.svg) [![](https://jaywcjlove.github.io/sb/ico/npm.svg)](https://www.npmjs.com/package/chinese-poetry)

[中文诗歌主页](https://shici.store)是一个基于浏览器的诗词网站， 包含唐诗三百首、宋词三百首等文集。

最全中华古诗词数据库，唐宋两朝近一万四千古诗人，接近5.5万首唐诗加26万宋诗，两宋时期1564位词人，21050首词。当前仓库基于 [`chinese-poetry`](https://github.com/chinese-poetry/chinese-poetry) 仓库的数据，让它更方便的应用于前端和 node.js 相关项目。

### 安装

安装《中文诗歌古典文集》包。

> package size:  68.9 MB
> unpacked size: 233.0 MB

```bash
npm install chinese-poetry --save
```

### 使用

使用 [`chinese-poetry`](https://www.npmjs.com/package/chinese-poetry) 包中数据。

```js
import poetry from 'chinese-poetry/lunyu/lunyu.json';
```

#### UNPKG

https://unpkg.com/browse/chinese-poetry/chinese-poetry/

上面链接可以在浏览器访问数据。

```bash
# 根据下面目录拼接 地址 访问数据
# 浏览器中访问
https://unpkg.com/browse/chinese-poetry/chinese-poetry/lunyu/lunyu.json
# 直接 JSON 数据
https://unpkg.com/chinese-poetry@1.1.0/chinese-poetry/lunyu/lunyu.json
```

#### Githack

https://raw.githack.com/chinese-poetry/chinese-poetry/master/ci/ci.song.4000.json

#### Statically

https://cdn.statically.io/gh/chinese-poetry/chinese-poetry/master/ci/ci.song.4000.json

### 目录

```
├── ci
│   ├── README.md
│   ├── author.song.json
│   ├── ci.db
│   ├── ci.song.0.json
│   ├── ci.song.1000.json
│   ├── ci.song.10000.json
│   ├── ci.song.11000.json
│   ├── ci.song.12000.json
│   ├── ci.song.13000.json
│   ├── ....
│   └── main.py
├── json
│   ├── README.md
│   ├── authors.song.json
│   ├── authors.tang.json
│   ├── poet.song.0.json
│   ├── poet.song.1000.json
│   ├── poet.song.10000.json
│   ├── poet.song.100000.json
│   ├── poet.song.101000.json
│   ├── ...
│   └── 表�\235��\223�\236\204�\227.json
├── lunyu
│   ├── README.md
│   └── lunyu.json
├── mengxue
│   ├── README.md
│   ├── baijiaxing.json
│   ├── dizigui.json
│   ├── qianziwen.json
│   ├── sanzijing-new.json
│   ├── sanzijing-traditional.json
│   ├── shenglvqimeng.json
│   ├── youxueqionglin.json
│   ├── zengguangxianwen.json
│   └── zhuzijiaxun.json
├── rank
│   ├── README.md
│   ├── ci
│   └── server.js
├── requirements.txt
├── shijing
│   ├── README.md
│   └── shijing.json
├── sishuwujing
│   ├── README.md
│   ├── daxue.json
│   ├── mengzi.json
│   └── zhongyong.json
├── test_poetry.py
├── wudai
│   ├── huajianji
│   └── nantang
└── youmengying
    ├── README.md
    └── youmengying.json
```

## License

[MIT](https://github.com/chinese-poetry/chinese-poetry/blob/master/LICENSE) 许可证.
