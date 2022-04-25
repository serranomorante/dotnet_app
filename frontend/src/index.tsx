import { createRoot } from "react-dom/client";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container as Element)

root.render(<App />)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
