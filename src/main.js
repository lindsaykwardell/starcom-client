import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
  faDiceD20,
} from "@fortawesome/free-solid-svg-icons";

import "@/assets/styles/index.postcss";
import "@fortawesome/fontawesome-svg-core/styles.css";

library.add(
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
  faDiceD20
);

// Vue.component("font-awesome", FontAwesomeIcon);

createApp(App)
  .component("font-awesome", FontAwesomeIcon)
  .mount("#app");
