import { useState, useRef } from "react";

export function useTypingEffect() {
  const [text, setText] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTypingTimer = () => {
    if (typingInterval.current) {
      clearInterval(typingInterval.current);
      typingInterval.current = null;
    }
  };

  // Type animation
  const typeText = (message: string, onDone?: () => void) => {
    clearTypingTimer();
    let i = 0;
    let current = "";
    setText("");
    setShowSaveButton(false);

    typingInterval.current = setInterval(() => {
      current += message[i];
      setText(current);
      i++;
      if (i >= message.length) {
        clearTypingTimer();
        setTimeout(() => {
          setShowSaveButton(true);
          onDone?.();
        }, 250);
      }
    }, 40);
  };

  // Erase animation
  const eraseQuick = (onFinish?: () => void) => {
    clearTypingTimer();
    setShowSaveButton(false);
    let temp = text;
    
    const interval = setInterval(() => {
      temp = temp.slice(0, -2);
      setText(temp);

      if (temp.length === 0) {
        clearInterval(interval);
        onFinish?.();
      }
    }, 20);
  };

  return { text, setText, typeText, eraseQuick, showSaveButton};
}
