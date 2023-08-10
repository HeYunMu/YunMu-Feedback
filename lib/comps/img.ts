interface ImgInitConfig {
  // 选择器 默认 ".yun-img-select"
  select?: string;
  // 点击蒙层关闭 默认 true
  maskColor?: string;
  zindex?: number;
}

interface ImgFun {
  init: (config: ImgInitConfig) => void;
}

function createPicBox(pic: string) {
  if ((pic ?? "") == "") {
    throw ReferenceError("pic is not defined");
  }
  if (document.body.querySelectorAll(`.yun-img-box-conatiner`).length === 0) {
    const div = document.createElement("div");
    div.classList.add("yun-img-box-conatiner", "animated");
    div.innerHTML = `<img class="yun-img-opened animated" src="${pic}" />`;
    return div;
  } else {
    return null;
  }
}

export function init(config?: ImgInitConfig) {
  config = Object.assign(
    {
      select: ".yun-img-select",
      maskColor: "rgba(0, 0, 0, 0.3)",
    },
    config
  );

  // 获取 图片元素
  const imgDivs = document.querySelectorAll<HTMLDivElement>(
    config.select ?? ".yun-img-select"
  );

  for (let index = 0; index < imgDivs.length; index++) {
    const element = imgDivs[index];
    // element.classList.add("yun-img__self");
    element.onclick = function (_e) {
      const oldNode = this as HTMLImageElement;
      // const newNode = oldNode.cloneNode(true) as HTMLImageElement;
      // oldNode.classList.add("yun-img__hidden");
      const imgBox = createPicBox(oldNode.getAttribute("src") ?? "");
      if (imgBox) {
        imgBox.setAttribute(
          "style",
          " " +
            `--yun-img-box-zindex: ${
              config?.zindex ?? 1000
            }; --yun-img-box-bgc: ${config?.maskColor ?? "rgba(0, 0, 0, 0.3)"};`
        );
        document.body.appendChild(imgBox);

        const innerDiv = imgBox.querySelector(".yun-img-opened");
        if (innerDiv) {
          innerDiv.classList.add("animate__zoomIn");
          setTimeout(function () {
            innerDiv.classList.remove("animate__zoomIn");
          }, 500);
        }
        // 注册关闭
        const emitClick = function () {
          if (innerDiv) {
            innerDiv.classList.add("animate__zoomOut");
            imgBox.classList.add("animate__fadeOut");
          }
          setTimeout(function () {
            imgBox.remove();
            window.removeEventListener("scroll", emitClick, false);
          }, 500);
        };

        imgBox.onclick = emitClick;
        // document.body.onscroll = emitClick
        window.addEventListener("scroll", emitClick, false);
      }
    };
  }
}

const img: ImgFun = {
  init,
};

export default img;
