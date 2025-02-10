import { registerRootComponent } from "expo";
import Reactotron from "reactotron-react-native";

if (__DEV__) {
  console.tron = Reactotron.configure({
    host: "localhost",
    port: 9090,
  })
    .useReactNative()
    .connect();
}

import App from "./src/App";

registerRootComponent(App);
