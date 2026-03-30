export default function ActionsPanel({ data }) {
  return (
    <div className="col-span-2 space-y-3">
      {/* Current Actions */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h2 className="text-white font-semibold text-base mb-3">Current Actions</h2>
        <ul className="space-y-2">
          {data.current_actions.map((action, i) => (
            <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>
              {action}
            </li>
          ))}
        </ul>
      </div>

      {/* Route Alert */}
      <div className="bg-slate-800 px-4 py-3 rounded-xl border border-slate-700 flex items-center gap-2">
        <span className="text-red-400 text-sm">⚠</span>
        <span className="text-red-400 font-semibold text-sm">ROUTE ALERT:</span>
        <span className="text-slate-300 text-sm">{data.route_alert}</span>
      </div>

      {/* AI Assessment */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <p className="text-slate-400 text-sm">
            AI Assessment:{" "}
            {data.recommended_resources.map((r, i) => (
              <span key={i} className="text-green-400 font-semibold ml-1">
                {r === "Boat" ? "🚤" : "🚁"} {r}
              </span>
            ))}
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
            🔔 Send Alert
          </button>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          {data.ai_assessment
            .split(/(high water depth|bridge collapse)/gi)
            .map((part, i) =>
              ["high water depth", "bridge collapse"].includes(part.toLowerCase()) ? (
                <span key={i} className="text-orange-400 underline decoration-dotted">
                  {part}
                </span>
              ) : (
                part
              )
            )}
        </p>
      </div>
    </div>
  );
}