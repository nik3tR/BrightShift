type ReframeCardProps = {
  id: string;
  original: string;
  reframe: string;
  onDelete: (id: string) => void;
};

export function ReframeCard({ id, original, reframe, onDelete }: ReframeCardProps) {
  return (
    <div className="group relative w-full max-w-[20rem] h-64 mx-auto [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-blue-700 italic bg-white rounded-xl shadow-md [backface-visibility:hidden]">
          {original}
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-blue-400 bg-white rounded-xl shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {reframe}
          <button
            onClick={() => onDelete(id)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all bg-red-400 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
