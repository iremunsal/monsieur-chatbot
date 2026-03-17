import MonsieurLogo from "./MonsieurLogo";

/**
 * Application header with French-themed gradient, chatbot logo, and status.
 * Features the tricolore accent stripe at the top.
 */
export default function Header() {
  return (
    <header>
      {/* French tricolore stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-blue-700" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-beret-500" />
      </div>
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 text-white px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MonsieurLogo size={44} />
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Monsieur Chatbot
              </h1>
              <p className="text-[11px] text-indigo-300 font-medium">
                Votre professeur de français personnel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
              <span className="text-xs">🇫🇷</span>
              <span className="text-[11px] text-indigo-200 font-medium">
                Français
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-[11px] text-indigo-200">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
