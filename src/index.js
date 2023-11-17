import React from "react";
import bridge from "@vkontakte/vk-bridge";
import ReactDOM from "react-dom";
import App from "./App";
import '@vkontakte/vkui/dist/vkui.css';
import {
  AdaptivityProvider,
  ConfigProvider,
} from '@vkontakte/vkui';

bridge.send("VKWebAppInit");

ReactDOM.render(
<ConfigProvider>
  <AdaptivityProvider>
    <App />
  </AdaptivityProvider>
</ConfigProvider>, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {});
}
