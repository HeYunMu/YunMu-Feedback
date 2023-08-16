interface ImgBaseConfig {
  maskColor?: string;
  zindex?: number;
  loadingPic?: string;
  errorPic?: string;
}
interface ImgInitConfig extends ImgBaseConfig {
  // 选择器 默认 ".yun-img-select"
  select?: string;
}
interface ImgOnceConfig extends ImgBaseConfig {
  src: string;
}

import loadingGif from "../assets/loading.gif";

const imgErr = "data:image/svg+xml;base64,PHN2ZyB0PSIxNjkxNzM0MzQxMDU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQwMzEiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTAuMjI0ZTNhODF6dkhZQTciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNODMyIDEyNi41MjggMTkyIDEyNi41MjhjLTcwLjY1NiAwLTEyOCA1Ny4zNDQtMTI4IDEyOGwwIDU3NmMwIDcwLjY1NiA1Ny4zNDQgMTI4IDEyOCAxMjhsNjQwIDBjNzAuNjU2IDAgMTI4LTU3LjM0NCAxMjgtMTI4bDAtNTc2Qzk2MCAxODMuODcyIDkwMi42NTYgMTI2LjUyOCA4MzIgMTI2LjUyOHpNODk2IDgzMC41MjhjMCAzNS4zOTItMjguNjA4IDY0LTY0IDY0TDE5MiA4OTQuNTI4Yy0zNS4zOTIgMC02NC0yOC42MDgtNjQtNjRsMC01NzZjMC0zNS4zOTIgMjguNjA4LTY0IDY0LTY0bDY0MCAwYzM1LjM5MiAwIDY0IDI4LjYwOCA2NCA2NEw4OTYgODMwLjUyOHpNNTEyIDI1NC41MjhjLTM1LjM5MiAwLTY0IDI4LjYwOC02NCA2NGwwIDI1NmMwIDM1LjM5MiAyOC42MDggNjQgNjQgNjRzNjQtMjguNjA4IDY0LTY0bDAtMjU2QzU3NiAyODMuMTM2IDU0Ny4zOTIgMjU0LjUyOCA1MTIgMjU0LjUyOHpNNTEyIDcwMi41MjhjLTM1LjM5MiAwLTY0IDI4LjYwOC02NCA2NHMyOC42MDggNjQgNjQgNjQgNjQtMjguNjA4IDY0LTY0UzU0Ny4zOTIgNzAyLjUyOCA1MTIgNzAyLjUyOHoiIHAtaWQ9IjQwMzIiPjwvcGF0aD48L3N2Zz4="

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

function showPicBox(config: ImgBaseConfig, src: string) {
  const imgBox = createPicBox(config.loadingPic ?? loadingGif);
  if (imgBox) {
    imgBox.setAttribute(
      "style",
      " " +
        `--yun-img-box-zindex: ${config?.zindex ?? 1000}; --yun-img-box-bgc: ${
          config?.maskColor ?? "rgba(0, 0, 0, 0.3)"
        };`
    );
    document.body.appendChild(imgBox);

    const innerDiv = imgBox.querySelector(".yun-img-opened");
    if (innerDiv) {
      // 图片加载事件
      let loadFun = function () {
        (innerDiv as HTMLImageElement).removeEventListener(
          "load",
          loadFun,
          false
        );
        (innerDiv as HTMLImageElement).src = src;
      };
      let loadErrFun = function () {
        (innerDiv as HTMLImageElement).removeEventListener(
          "error",
          loadErrFun,
          false
        );
        (innerDiv as HTMLImageElement).src = config.errorPic ?? imgErr;
      };
      (innerDiv as HTMLImageElement).addEventListener("load", loadFun, false);
      (innerDiv as HTMLImageElement).addEventListener("error", loadErrFun, false);

      // (innerDiv as HTMLImageElement).onload = function () {

      // }
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
      showPicBox(config ?? {}, oldNode.getAttribute("src") ?? "");
    };
  }
}

export function once(config: ImgOnceConfig) {
  showPicBox(config ?? {}, config.src ?? "");
}
