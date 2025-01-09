import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PropsType {
  children: React.ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PropsType) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(children, document.getElementById(selector));
  } else {
    return null;
  }
};

export default Portal;
