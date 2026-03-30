export default function SARUpdates({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h2 className="text-white font-semibold text-base mb-3">SAR / News Updates</h2>

      <ul className="space-y-3 mb-4">
        <li className="flex items-start gap-2 text-slate-300 text-sm">
          <span className="w-2 h-2 mt-1.5 rounded-full bg-slate-500 shrink-0"></span>
          Water Depth:{" "}
          <span className="font-medium text-white ml-1">{data.water_depth}</span>
        </li>
        <li className="flex items-start gap-2 text-slate-300 text-sm">
          <span className="w-2 h-2 mt-1.5 rounded-full bg-slate-500 shrink-0"></span>
          Affected Areas:{" "}
          <span className="font-medium text-white ml-1">{data.affected_areas}</span>
        </li>
        <li className="flex items-start gap-2 text-slate-300 text-sm">
          <span className="w-2 h-2 mt-1.5 rounded-full bg-slate-500 shrink-0"></span>
          {data.bridge_status}
        </li>
      </ul>

      <p className="text-slate-400 text-xs mb-2">
        Keywords:{" "}
        {data.keywords.map((k, i) => (
          <span key={i} className="text-slate-300">
            "{k}"{i < data.keywords.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>

      <div className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 p-2.5 rounded-lg text-sm flex items-center gap-2">
        <span>⚠</span>
        {data.alerts[0]}
      </div>
    </div>
  );
}