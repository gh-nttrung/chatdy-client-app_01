import React, { createContext, useState, FC } from 'react';

interface AuthContextData {
  user_id: string;
  user_name: string;
  first_name: string;
  last_name: string;
}

interface Props extends React.PropsWithChildren {
  authData: AuthContextData | null;
  handleAuthData: (data: any) => void;
}

export const AuthContext = createContext<Props>({
  authData: null,
  handleAuthData: () => {},
});

const AuthContextProvider: FC<Props> = (props) => {
  const [authData, setAuthData] = useState<any>(null);

  const handleAuthData = (data: any) => {
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ authData, handleAuthData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
