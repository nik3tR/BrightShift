import { ReframeCard } from "./ReframeCard";

type Props = {
  reframes: { id: string; original: string; reframe: string }[];
  onDelete: (id: string) => void;
};

export function ReframeGrid({ reframes, onDelete }: Props) {
  if (!reframes.length) return null;
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 pb-20">
      {reframes.map((r) => (
        <ReframeCard key={r.id} {...r} onDelete={onDelete} />
      ))}
    </div>
  );
}
