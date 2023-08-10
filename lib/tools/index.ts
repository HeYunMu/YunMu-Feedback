export function showMask(flag: boolean, ref?: Element | null) {
  if (document.body.querySelectorAll(".yun-mask").length === 0) {
    const div = document.createElement("div");
    div.classList.add(
      "yun-mask",
      "animate__opcity120",
      flag ? "null" : "bn",
      !!ref ? "yun-has-ref" : "null"
    );
    if (ref) {
      ref.classList.add("yun-loading-conatiner");
      ref.appendChild(div);
    } else {
      document.body.appendChild(div);
    }
    setTimeout(function () {
      div.classList.remove("animate__opcity120");
    }, 300);
  }
}

export function closeMask() {
  if (document.body.querySelectorAll(".yun-mask").length > 0) {
    const div = document.body.querySelector(".yun-mask");
    if (div) {
      div.classList.add("animate__opcity021");
      setTimeout(function () {
        div.remove();
        (div.parentNode as HTMLDivElement)?.classList.remove("yun-loading-conatiner")
      }, 300);
    }
  }
}
