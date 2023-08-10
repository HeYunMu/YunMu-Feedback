import { closeMask, showMask } from "../tools/index";
import { v4 as uuidv4 } from "uuid";

export interface LoadingConfig {
  message?: string;
  mask?: boolean;
  theme?: "normal" | "pic";
  pic?: string;
  ref?: Element | null;
}
export interface LoadingFun {
  show: (config: LoadingConfig) => void;
  hide: (uid: string) => void;
}

function createNormalLoading(msg: string, uid: string, hasRef: boolean) {
  if (document.body.querySelectorAll(`[loading-${uid}]`).length === 0) {
    const div = document.createElement("div");
    div.classList.add("yun-toast-loading");
    if (hasRef) {
      div.classList.add("yun-has-ref");
    }
    div.setAttribute(`loading-${uid}`, "");
    div.innerHTML = `<div class="yun-toast-loading__inner animated">
  <svg class="animated animate__changeright" viewBox="0 0 1024 1024" version="1.1"
   xmlns="http://www.w3.org/2000/svg" p-id="3173" width="64" height="64"><path d="M431.633655 87.958069a80.366345 80.366345 0 1 0 160.697379 0 80.366345 80.366345 0 1 0-160.732689 0h0.03531zM119.966897 220.689655a78.035862 78.035862 0 1 0 156.071724 0 78.035862 78.035862 0 1 0-156.071724 0zM1.182897 514.153931a71.044414 71.044414 0 0 0 142.088827 0 71.044414 71.044414 0 0 0-142.088827 0z m125.775448 320.211862a61.722483 61.722483 0 0 0 123.444965 0 61.722483 61.722483 0 0 0-123.444965 0z m333.806345 133.755586a53.707034 53.707034 0 0 0 107.414069 0 53.707034 53.707034 0 0 0-107.414069 0z m345.829517-123.233103a38.488276 38.488276 0 1 0 76.976552 0 38.488276 38.488276 0 1 0-76.976552 0z m160.114759-332.199724a27.277241 27.277241 0 1 0 54.554482 0 27.277241 27.277241 0 1 0-54.554482 0z m-81.937656-286.102069a19.473655 19.473655 0 0 0 38.964966 0 19.473655 19.473655 0 0 0-38.964966 0z" p-id="3174" fill="#ffffff"></path></svg>
   <div class="yun-toast-loading__inner-msg">${msg}</div>
   </div>`;
    return div;
  } else {
    return null;
  }
}

function createPicLoading(pic: string, uid: string, hasRef: boolean) {
  if ((pic ?? "") == "") {
    throw ReferenceError("pic is not defined");
  }
  if (document.body.querySelectorAll(`[loading-${uid}]`).length === 0) {
    const div = document.createElement("div");
    div.classList.add("yun-toast-loading", "pic");
    if (hasRef) {
      div.classList.add("yun-has-ref");
    }
    div.setAttribute(`loading-${uid}`, "");
    div.innerHTML = `<div class="yun-toast-loading__inner animated">
    <img class="pic_inner" src="${pic}" />
   </div>`;
    return div;
  } else {
    return null;
  }
}

export function show(config?: LoadingConfig) {
  const uid = uuidv4();
  config = Object.assign(
    {
      message: "正在努力加载中",
      mask: true,
      theme: "normal",
      pic: "",
      ref: null,
    } as LoadingConfig,
    config
  );
  showMask(config.mask ?? true , config.ref);
  let loadingDiv: HTMLDivElement | null = null;
  if (config.theme === "normal") {
    loadingDiv = createNormalLoading(config.message ?? "正在努力加载中", uid, !!config.ref);
  } else if (config.theme === "pic") {
    loadingDiv = createPicLoading(config.pic ?? "", uid, !!config.ref);
  }

  if (loadingDiv == null) {
    return;
  }

  if (config.ref) {
    config.ref.appendChild(loadingDiv);
  } else {
    document.body.appendChild(loadingDiv);
  }
  const msgInnerDiv = loadingDiv.querySelector(".yun-toast-loading__inner");
  if (msgInnerDiv) {
    msgInnerDiv.classList.add("animate__bounceIn");
    setTimeout(function () {
      msgInnerDiv.classList.remove("animate__bounceIn");
    }, 500);
  }
  return uid;
}

export function hide(uid: string) {
  if (document.body.querySelectorAll(`[loading-${uid}]`).length > 0) {
    const loadingDiv = document.body.querySelector(`[loading-${uid}]`);
    if (loadingDiv) {
      const msgInnerDiv = loadingDiv.querySelector(".yun-toast-loading__inner");
      if (msgInnerDiv) {
        msgInnerDiv.classList.add("animate__bounceOut");
      }
      closeMask();
      setTimeout(function () {
        loadingDiv.remove();
      }, 500);
    }
  }
}

const loading: LoadingFun = {
  show,
  hide,
};

export default loading;
