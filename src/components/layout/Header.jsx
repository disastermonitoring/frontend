export default function Header({ data }) {
  return (
    <div className="border-b border-slate-700 pb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Flood AI Control{" "}
          <span className="font-normal text-slate-400">– Night Mode</span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm font-medium">Status:</span>
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block shadow-lg shadow-red-500/50"></span>
          <span className="text-white font-semibold text-lg">Flood Detected</span>
        </div>
      </div>
      <p className="text-slate-400 mt-3 text-sm flex items-center gap-2">
        <span className="text-slate-500">⏱</span>
        <span className="font-semibold text-white">{data.time}</span>
        <span className="text-slate-600">|</span>
        <span className="font-semibold text-white">{data.location}</span>
        <span className="text-slate-600">|</span>
        <span>Confidence: {data.confidence}</span>
      </p>
    </div>
  );
}