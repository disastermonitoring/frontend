export default function ImpactZones({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h2 className="text-white font-semibold text-base mb-3">Impact Zones</h2>

      <div className="space-y-3 mb-4">
        {data.impact_zones.map((zone, i) => (
          <p key={i} className="text-sm flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                zone.color === "red" ? "bg-red-500" : "bg-orange-400"
              }`}
            ></span>
            <span
              className={`font-semibold ${
                zone.color === "red" ? "text-red-400" : "text-orange-400"
              }`}
            >
              {zone.level}:
            </span>
            <span className="text-white">{zone.area}</span>
          </p>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-3 space-y-1 text-sm text-slate-400">
        <p>
          Road NH-183:{" "}
          <span className="font-semibold text-white">{data.road_status}</span>
        </p>
        <p>
          Flood Spread:{" "}
          <span className="font-semibold text-white">{data.flood_spread}</span>
        </p>
      </div>
    </div>
  );
}