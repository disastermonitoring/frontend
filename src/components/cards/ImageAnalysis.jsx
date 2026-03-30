export default function ImageAnalysis({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h2 className="text-white font-semibold text-base mb-3">Image Analysis</h2>

      <img
        src="https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop"
        alt="flood scene"
        className="rounded-lg mb-3 w-full object-cover h-44"
      />

      <p className="text-white font-bold text-base mb-1">
        Flood: <span className="text-green-400">YES</span>
      </p>

      <p className="text-slate-500 text-xs mb-3">
        Event ID: <span className="text-slate-300 font-medium">{data.event_id}</span>
      </p>

      <ul className="space-y-1">
        {data.detections.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}