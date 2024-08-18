import useSessionStorage from '@/utils/useSessionStorage';
import React, { SetStateAction, useEffect } from 'react';


interface IDispatch {
  type: string;
  data: any;
}

interface AppContextType {
  username: string;
  setUsername: React.Dispatch<SetStateAction<string>>;
}

interface AppContextProps {
  children?: React.ReactNode;
}

interface ISettings {
  username: string;
  theme: string;
}

const initialSettings: ISettings = {
  username: '',
  theme: 'light',
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const [username, setUsername] = useSessionStorage('username', '');

  return <AppContext.Provider value={{username, setUsername}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
