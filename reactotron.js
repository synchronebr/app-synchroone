import Reactotron from "reactotron-react-native";

console.tron = Reactotron.configure({
  host: "localhost",
  port: 9090,
})
  .useReactNative()
  .connect();
