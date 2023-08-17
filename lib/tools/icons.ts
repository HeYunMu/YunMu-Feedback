// 代码借鉴 sweetalert
// url: https://sweetalert.js.org/

import { h } from ".";

const ICON = "yun-icon";

const errorIconMarkup = (): string => {
  const icon = `${ICON}--error`;
  const line = `${icon}__line`;

  const markup = `
    <div class="${icon}__x-mark">
      <span class="${line} ${line}--left"></span>
      <span class="${line} ${line}--right"></span>
    </div>
  `;

  return markup;
};

const warningIconMarkup = (): string => {
  const icon = `${ICON}--warning`;

  return `
    <span class="${icon}__body">
      <span class="${icon}__dot"></span>
    </span>
  `;
};

const successIconMarkup = (): string => {
  const icon = `${ICON}--success`;

  return `
    <span class="${icon}__line ${icon}__line--long"></span>
    <span class="${icon}__line ${icon}__line--tip"></span>

    <div class="${icon}__ring"></div>
    <div class="${icon}__hide-corners"></div>
  `;
};

const PREDEFINED_ICONS: string[] = ["error", "warning", "success", "info"];

const ICON_CONTENTS: any = {
  error: errorIconMarkup(),
  warning: warningIconMarkup(),
  success: successIconMarkup(),
};

const initPredefinedIcon = (type: string, iconEl: Element): void => {
  const iconTypeClass: string = `${ICON}--${type}`;
  iconEl.classList.add(iconTypeClass);

  const iconContent: string = ICON_CONTENTS[type];

  if (iconContent) {
    iconEl.innerHTML = iconContent;
  }
};

const initImageURL = (url: string, iconEl: Element): void => {
  iconEl.classList.add(`${ICON}--custom`);

  let img = h("img");
  img.src = url;

  iconEl.appendChild(img);
};


export const initIcon = (str: string): HTMLDivElement | null => {
    if (!str) return null;
  
    let iconEl: HTMLDivElement = h("div");
    iconEl.classList.add(ICON)
  
    if (PREDEFINED_ICONS.includes(str)) {
      initPredefinedIcon(str, iconEl);
    } else {
      initImageURL(str, iconEl);
    }
  
    return iconEl;
  };
  