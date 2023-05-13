import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <AuthContextProvider authData={null} handleAuthData={() => {}}>
    <App />
  </AuthContextProvider>
  // </React.StrictMode>,
);
