export function showMask(flag: boolean, ref?: Element | null) {
  if (document.body.querySelectorAll(".nil-mask").length === 0) {
    const div = document.createElement("div");
    div.classList.add(
      "nil-mask",
      "animate__opcity120",
      flag ? "null" : "bn",
      !!ref ? "nil-has-ref" : "null"
    );
    if (ref) {
      ref.classList.add("nil-loading-conatiner");
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
  if (document.body.querySelectorAll(".nil-mask").length > 0) {
    const div = document.body.querySelector(".nil-mask");
    if (div) {
      div.classList.add("animate__opcity021");
      setTimeout(function () {
        div.remove();
        (div.parentNode as HTMLDivElement)?.classList.remove("nil-loading-conatiner")
      }, 300);
    }
  }
}
