import React, { useState, useEffect, useImperativeHandle } from "react";

interface ToastProps {
  initialMessage?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ToastHandles {
  showToast: (msg: string, bg?: string, text?: string) => void; // Updated the signature to include bg and text
}

// eslint-disable-next-line react/display-name
const Toast = React.forwardRef<ToastHandles, ToastProps>(
  (
    {
      initialMessage = "",
      backgroundColor: defaultBackgroundColor = "bg-black", // Renamed for clarity
      textColor: defaultTextColor = "text-white", // Renamed for clarity
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(Boolean(initialMessage));
    const [message, setMessage] = useState(initialMessage);
    const [backgroundColor, setBackgroundColor] = useState(
      defaultBackgroundColor
    ); // State for dynamic background
    const [textColor, setTextColor] = useState(defaultTextColor); // State for dynamic text color

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [isVisible]);

    useImperativeHandle(ref, () => ({
      showToast: (
        msg: string,
        bg: string = defaultBackgroundColor,
        text: string = defaultTextColor
      ) => {
        setMessage(msg);
        setBackgroundColor(bg); // Set the dynamic background color
        setTextColor(text); // Set the dynamic text color
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
