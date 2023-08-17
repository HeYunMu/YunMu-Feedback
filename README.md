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

## 模块 **alert**

**参数**

| 参数项      | 可选     | 默认值   | 注释             |
| ----------- | -------- | -------- | ---------------- |
| title       | string   | 温馨提示 | 标题             |
| message     | \*string | ""       | 消息             |
| icon        | string   | -        | 类型图标         |
| confirmShow | boolean  | true     | 是否显示确认按钮 |
| confirmText | string   | 确认     | 确认按钮文字     |
| cancelShow  | boolean  | false    | 是否显示取消按钮 |
| cancelText  | string   | 取消     | 取消按钮文字     |
| buttons     | []       | []       | 自定义按钮       |
| animate     | string   | bounce   | 动画 css         |
| method      | function | -        | 回调方法         |

**按钮组**

| 参数项 | 可选   | 默认值 | 注释         |
| ------ | ------ | ------ | ------------ |
| name   | string | ""     | 按钮文字内容 |
| class  | string | -      | 类名称       |
| method | string | -      | 方法名称     |

**定义动画 css**

```css
@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.animate__bounceIn {
  animation-duration: 0.75s;
  animation-duration: calc(var(--animate-duration) * 0.75);
  animation-name: bounceIn;
}

@keyframes bounceOut {
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
}

.animate__bounceOut {
  animation-duration: 0.75s;
  animation-duration: calc(var(--animate-duration) * 0.75);
  animation-name: bounceOut;
}
```

**使用**

```js
alert({
  icon: "success",
  buttons: [
    { name: "按钮1", method: "success", class: "primary" },
    { name: "按钮2", method: "failed", class: "success" },
  ],
  confirmShow: false,
  cancelShow: false,
  title: "提示",
  message:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit. ",
  method(_e, option, hide) {
    console.log(option);
    hide();
    return true;
  },
});
```
