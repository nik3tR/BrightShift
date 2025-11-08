type HeaderProps = {
  session: any;
  onSignIn: () => void;
  onSignOut: () => void;
};

export function Header({ session, onSignIn, onSignOut }: HeaderProps) {
  return (
    <header className="w-full flex justify-between items-center px-8 py-6">
      <div className="text-3xl font-bold">
        <span className="text-blue-600">Bright</span>Shift
      </div>
      {!session ? (
        <button
          onClick={onSignIn}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={onSignOut}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Sign Out
        </button>
      )}
    </header>
  );
}
