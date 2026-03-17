/**
 * Application header with the chatbot title and online status indicator.
 */
export default function Header() {
  return (
    <header className="bg-indigo-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
            M
          </div>
          <div>
            <h1 className="text-lg font-bold">Monsieur Chatbot</h1>
            <p className="text-xs text-indigo-200">
              Votre professeur de français
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-indigo-200">En ligne</span>
        </div>
      </div>
    </header>
  );
}
