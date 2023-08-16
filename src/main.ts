import { alert, img, loading } from "../lib/main";
const clickBox = document.querySelector<HTMLDivElement>(".js-click-box");

const methodMap = {
  showLoading: () => {
    const loadingId = loading.show();
    if (loadingId) {
      //   console.log("loading id === > " + loadingId);
      setTimeout(() => {
        loading.hide(loadingId);
      }, 2000);
    }
  },
  showPicLoading: () => {
    const loadingId = loading.show({
      mask: false,
      theme: "pic",
      // pic: "/loading.gif",
      pic: "https://app.nilbrains.com/t/loading2.gif",
      picWidth: "265px",
    });
    if (loadingId) {
      //   console.log("loading id === > " + loadingId);
      setTimeout(() => {
        loading.hide(loadingId);
      }, 2000);
    }
  },
  showPicRefLoading: () => {
    const loadingId = loading.show({
      mask: true,
      theme: "pic",
      pic: "/loading.gif",
      ref: document.querySelector(".js-accc"),
    });
    if (loadingId) {
      //   console.log("loading id === > " + loadingId);
      setTimeout(() => {
        loading.hide(loadingId);
      }, 2000);
    }
  },

  imgInit: () => {
    img.once({
      src: "https://cdn.pixabay.com/photo/2023/07/28/18/23/bird-8155768_1280.jpg",
    });
  },

  showAlert: () => {
    alert({
      message:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil qui perspiciatis, odit corrupti repudiandae, amet consequuntur minus dolorum omnis natus facilis aut ea explicabo maxime quod dolorem illo ex.",
      method(_e, option, hide) {
        console.log(option);
        hide();
        return true;
      },
    });
  },
} as Record<string, Function>;

if (clickBox != null) {
  clickBox.onclick = (e) => {
    const target = e?.target as HTMLButtonElement;
    methodMap[target?.dataset?.btn as string]();
  };
}
