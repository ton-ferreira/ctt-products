import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import Router from "./app/router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
