import { createContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notify, setNotify] = useState(false);

  const showNotify = (message) => {
    setNotify(message);

    setTimeout(() => {
      setNotify(false);
    }, 1000);
  };

  return (
    <NotificationContext.Provider value={{ notify, showNotify }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
