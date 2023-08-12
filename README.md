# YunMuFeed

[![Security Status](https://www.murphysec.com/platform3/v31/badge/1689826654463746048.svg)](https://www.murphysec.com/console/report/1689826654425997312/1689826654463746048)

## 模块 **loading**

**参数**

| 参数项   | 可选           | 默认值         | 注释                  |
| -------- | -------------- | -------------- | --------------------- |
| message  | string         | 正在努力加载中 | 文字内容              |
| mask     | boolean        | true           | loading 背景          |
| theme    | `normal` `pic` | normal         | 主题                  |
| pic      | -              | -              | 主题为`pic`下图片链接 |
| picWidth | string         | 120px          | 主题为`pic`下图片宽度 |
| ref      | -              | -              | 指向元素              |

**使用**

```js
// 1. 默认使用
const loadingId = loading.show();
if (loadingId) {
  setTimeout(() => {
    loading.hide(loadingId);
  }, 2000);
}

// 2. 使用图片 (或许自行修改 图片样式)
const loadingId = loading.show({
  mask: false,
  theme: "pic",
  pic: "/loading.gif",
});
if (loadingId) {
  setTimeout(() => {
    loading.hide(loadingId);
  }, 2000);
}
```

## 模块 **img**

**init 参数**

| 参数项     | 可选   | 默认值             | 注释     |
| ---------- | ------ | ------------------ | -------- |
| maskColor  | string | rgba(0, 0, 0, 0.3) | 背景颜色 |
| zindex     | string | 1000               | 层级     |
| loadingPic | string | -                  | 加载图片 |
| errorPic   | string | -                  | 失败图片 |
| select     | string | .yun-img-select    | 选择器   |

**使用**

```js
// 仅显示一次
img.once({
  src: "https://cdn.pixabay.com/photo/2023/07/28/18/23/bird-8155768_1280.jpg",
});

// 全局初始化
img.init();
```
