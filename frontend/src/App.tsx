import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useReframes } from "./hooks/useReframes";
import { useTypingEffect } from "./hooks/useTypingEffect";
import { useThinkingDots } from "./hooks/useThinkingDots";
import { Header } from "./components/Header";
import { ReframeInput } from "./components/ReframeInput";
import { ReframeGrid } from "./components/ReframeGrid";

export default function App() {
  const { session, signInWithGoogle, signOut } = useAuth();
  const { reframes, saveReframe, deleteReframe } = useReframes(session);
  const { text, setText, typeText, eraseQuick, showSaveButton} = useTypingEffect();
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const thinkingText = useThinkingDots(loading, "Thinking");
  const handleSubmit = async () => {
    if (!inputText.trim() || loading) return;
    setLoading(true);

    eraseQuick(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/reframe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const reframe = data.reframe || "No reframe received.";
        typeText(reframe);
      } catch {
        typeText("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    });
  };

  const handleSave = () => {
    if (!session?.user) return;
    // Save current input and generated text
    saveReframe(inputText, text);
  };

  const handleNew = () => {
    eraseQuick(() => {
      setInputText("");
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Header session={session} onSignIn={signInWithGoogle} onSignOut={signOut} />
      <main className="flex flex-col items-center flex-1 w-full px-4 sm:px-6 pt-16 pb-20 space-y-10">
        <ReframeInput
          text={text}
          setText={setText}
          inputText={inputText}
          setInputText={setInputText}
          showSaveButton={showSaveButton}
          session={session}
          loading={loading}
          thinkingText={thinkingText}
          onSubmit={handleSubmit}
          onSave={handleSave}
          onNew={handleNew}
        />
        {session && <ReframeGrid reframes={reframes} onDelete={deleteReframe} />}
      </main>
    </div>
  );
}
