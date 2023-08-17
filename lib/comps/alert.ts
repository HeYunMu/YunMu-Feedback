import { v4 as uuidv4 } from "uuid";
import { h } from "../tools";

interface YunAlertConfig {
  title?: string;
  message: string;
  icon?: string;
  confirmText?: string;
  cancelShow?: boolean;
  cancelText?: string;
  buttons?: string[];
  animate?: string;
  method?: (e: Event, option: string, hide: () => void) => boolean;
}

function hide(uid: string, config: YunAlertConfig) {
  if (document.body.querySelectorAll(`[alert-${uid}]`).length > 0) {
    const _ = document.body.querySelector(`[alert-${uid}]`);
    if (_) {
      const msgInnerDiv = _.querySelector(".yun-alert-box");
      if (msgInnerDiv) {
        msgInnerDiv.classList.add(`animate__${config.animate || "bounce"}Out`);
      }
      setTimeout(function () {
        _.remove();
      }, 500);
    }
  }
}

function show(config: YunAlertConfig) {
  const uid = uuidv4();

  const _fn = (e: Event) => {
    if (config.method && typeof config.method == "function") {
      const flag = config.method(
        e,
        (e?.target as unknown as { dataset: { option: string } })?.dataset
          ?.option,
        () => {
          hide(uid, config);
        }
      );
      !flag && hide(uid, config);
    } else {
      hide(uid, config);
    }
  };

  // 创建一个窗口
  const _ = h("div");
  _.classList.add("yun-alert");
  _.setAttribute("alert-" + uid, "");

  const base = h("div");
  base.classList.add("yun-alert-box", "animated");
  if (config.icon) {
    const icon = h("img");
    icon.classList.add("yun-alert-icon");
    icon.src = config.icon ?? "";
    base.appendChild(icon);
  }

  const title = h("div");
  title.classList.add("yun-alert-title");
  title.innerText = config.title ?? "温馨提示";
  base.appendChild(title);

  const message = h("div");
  message.classList.add("yun-alert-message");
  message.innerText = config.message ?? "";
  base.appendChild(message);

  //   生成按钮
  const optionsBox = h("div");
  optionsBox.classList.add("yun-alert-options-box");

  const cancelButton = h("button");
  cancelButton.setAttribute("data-option", "cancel");
  cancelButton.classList.add("yun-alert-btn");
  cancelButton.innerText = config.cancelText ?? "取消";
  optionsBox.appendChild(cancelButton);
  cancelButton.onclick = _fn;

  const confirmButton = h("button");
  confirmButton.setAttribute("data-option", "confirm");
  confirmButton.classList.add("yun-alert-btn", "primary");
  confirmButton.innerText = config.confirmText ?? "确认";
  optionsBox.appendChild(confirmButton);
  confirmButton.onclick = _fn;

  base.appendChild(optionsBox);

  _.appendChild(base);
  document.body.appendChild(_);

  if (base) {
    base.classList.add(`animate__${config.animate || "bounce"}In`);
    setTimeout(function () {
      base.classList.remove(`animate__${config.animate || "bounce"}In`);
    }, 500);
  }
}

export function alert(config: YunAlertConfig) {
  show(config);
}
