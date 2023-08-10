import { showMask } from "../tools";

interface ImgInitConfig {
  // 选择器 默认 ".yun-img-select"
  select?: string;
  // 点击蒙层关闭 默认 true
  maskClose?: boolean;
}

interface ImgFun {
  init: (config: ImgInitConfig) => void;
}

export function init(config?: ImgInitConfig) {
  config = Object.assign(
    {
      select: ".yun-img-select",
      maskClose: true,
    },
    config
  );

  // 获取 图片元素
  const imgDivs = document.querySelectorAll<HTMLDivElement>(
    config.select ?? ".yun-img-select"
  );

  for (let index = 0; index < imgDivs.length; index++) {
    const element = imgDivs[index];
    element.onclick = function (_e) {
      const oldNode = this as HTMLDivElement;
      const newNode = oldNode.cloneNode(true) as HTMLDivElement;

      oldNode.classList.add("yun-img__hidden");

      showMask(true);
      // 获取元元素宽高比
    //   const hw = oldNode.clientHeight / oldNode.clientWidth;
    //   const imgHei = Math.floor(document.documentElement.clientWidth * 0.9 * hw);
    //   //   newNode.classList.add("yun-img__opened")
    //   newNode.style.width = document.documentElement.clientWidth * 0.9 + "px";
    //   newNode.style.height = imgHei + "px";
    //   newNode.style.position = "absolute";
    //   newNode.style.left = "0";
    //   newNode.style.top =
    //     (document.documentElement.clientHeight - imgHei) / 2 + "px";

      document.body.appendChild(newNode);
    };
  }
}

const img: ImgFun = {
  init,
};

export default img;
