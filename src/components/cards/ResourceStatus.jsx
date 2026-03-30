export default function ResourceStatus({ data }) {
  const r = data.resources;

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h2 className="text-white font-semibold text-base mb-3">Resource Status</h2>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
        <p className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Boats Available: <span className="font-semibold text-white">{r.boats}</span>
        </p>
        <p className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Helicopters: <span className="font-semibold text-white">{r.helicopters}</span>
        </p>
        <p className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Medical Units: <span className="font-semibold text-white">{r.medical}</span>
        </p>
        <p className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Shelters Open: <span className="font-semibold text-white">{r.shelters}</span>
        </p>
      </div>

      <p className="text-slate-500 text-xs border-t border-slate-700 pt-3">
        RS Station Alert 📍{" "}
        <span className="text-slate-300 font-medium">{data.rs_station}</span>{" "}
        | {data.rs_coords}
      </p>
    </div>
  );
}