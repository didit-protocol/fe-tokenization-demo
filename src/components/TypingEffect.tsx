import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 100); 

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [index, text]);

  return (
    <div>
      {displayedText}
      <span className="typing-cursor"></span>
    </div>
  );
}

export default TypingEffect;
