type Props = {
  text: string;
  setText: (v: string) => void;
  inputText: string;
  setInputText: (v: string) => void;
  showSaveButton: boolean;
  session: any;
  loading: boolean;
  thinkingText: string;
  onSubmit: () => void;
  onSave: () => void;
  onNew: () => void;
};

export function ReframeInput({
  text,
  setText,
  inputText,
  setInputText,
  showSaveButton,
  session,
  loading,
  thinkingText,
  onSubmit,
  onSave,
  onNew,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mt-24 px-2">
      <textarea
        autoFocus
        spellCheck={false}
        value={text}
        onChange={(e) => {
          setInputText(e.target.value);
          setText(e.target.value);
          const el = e.target;
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }}
        onKeyDown={handleKeyDown}
        maxLength={300}
        placeholder={loading ? thinkingText : "Please enter a negative thought:"}
        className="bg-transparent border-none outline-none text-center text-2xl font-medium resize-none placeholder-gray-400 text-gray-800 w-full max-w-[700px] min-h-[140px] overflow-hidden transition-all"
        style={{ lineHeight: "1.4" }}
      />
      <div className="min-h-[32px] flex justify-center">
        {showSaveButton && !loading ? (
          <div className="flex flex-wrap justify-center gap-5">
            {session ? (
              <button
                onClick={onSave}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
              >
                Save Reframe
              </button>
            ) : (
              <p className="text-gray-500 flex items-center">Log in to save</p>
            )}
            <button
              onClick={onNew}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              New Reframe
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
