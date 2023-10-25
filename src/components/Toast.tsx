import React, { useState, useEffect, useImperativeHandle } from "react";

interface ToastProps {
  initialMessage?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ToastHandles {
  showToast: (msg: string) => void;
}

// eslint-disable-next-line react/display-name
const Toast = React.forwardRef<ToastHandles, ToastProps>(
  (
    {
      initialMessage = "",
      backgroundColor = "bg-black",
      textColor = "text-white",
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(Boolean(initialMessage));
    const [message, setMessage] = useState(initialMessage);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [isVisible]);

    useImperativeHandle(ref, () => ({
      showToast: (msg: string) => {
        setMessage(msg);
        setIsVisible(true);
      },
    }));

    if (!isVisible) return null;

    return (
      <div
        className={`${backgroundColor} ${textColor} fixed bottom-0 right-0 mb-4 mr-4 p-2 rounded`}
      >
        {message}
      </div>
    );
  }
);

export default Toast;
