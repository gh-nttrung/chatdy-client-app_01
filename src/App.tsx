import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Suspense,
  lazy,
  FunctionComponent,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "./context/AuthContextProvider";

import Layout from "./components/layout";
import Auth from "./components/Auth";
import { post } from "./common/api";

const HomePage = lazy(() => import("./pages/home"));
const ChatPage = lazy(() => import("./pages/chat"));
const ChatAIPage = lazy(() => import("./pages/chatAI"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const NotFoundPage = lazy(() => import("./pages/notfound"));

const App: FunctionComponent = () => {
  const { handleAuthData } = useContext(AuthContext);

  const handleVerifyToken = async () => {
    const token = localStorage.getItem("authToken");
    if(token){
      const res = await post("/auth/verify_token", {
        token: `${localStorage.getItem("authToken")}`,
      });
      if (res.success) {
        handleAuthData(res.data);
      } else {
        localStorage.setItem("authToken", "");
        handleAuthData(null);
      }
    }
  };
  
  useEffect(() => {
    handleVerifyToken();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Auth>
                  <Layout>
                    <HomePage />
                  </Layout>
                </Auth>
              </Suspense>
            }
          />
          <Route
            path="/chat"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Auth>
                  <Layout>
                    <ChatPage />
                  </Layout>
                </Auth>
              </Suspense>
            }
          />
          <Route
            path="/chatAI"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Auth>
                  <Layout>
                    <ChatAIPage />
                  </Layout>
                </Auth>
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
