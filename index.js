import { registerRootComponent } from "expo";

if (__DEV__) {
  import("./reactotron");
}

import App from "./src/App";

registerRootComponent(App);
