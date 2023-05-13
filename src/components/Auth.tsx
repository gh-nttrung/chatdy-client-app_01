import { FunctionComponent, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const Auth: FunctionComponent<Props> = ({ children }) => {
  const token = localStorage.getItem("authToken");

  return <>{token ? children : <Navigate to="/login" replace={true} />}</>;
};

export default Auth;
