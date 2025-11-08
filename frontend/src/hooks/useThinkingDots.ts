import { useEffect, useState } from "react";

export function useThinkingDots(loading: boolean, base = "Thinking") {
  const [thinkingText, setThinkingText] = useState(base);

  useEffect(() => {
    if (!loading) {
      setThinkingText(base);
      return;
    }
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      setThinkingText(base + ".".repeat(dots));
    }, 500);
    return () => clearInterval(interval);
  }, [loading, base]);

  return thinkingText;
}
