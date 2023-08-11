# YunMuFeed

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
