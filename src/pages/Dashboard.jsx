import Header from "../components/layout/Header";
import ImageAnalysis from "../components/cards/ImageAnalysis";
import SARUpdates from "../components/cards/SARUpdates";
import ImpactZones from "../components/cards/ImpactZones";
import ResourceStatus from "../components/cards/ResourceStatus";
import ActionsPanel from "../components/cards/ActionsPanel";
import useFloodData from "../hooks/useFloodData";

export default function Dashboard() {
  const { data, status } = useFloodData();

  if (!data && status !== "connected") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white text-lg">
        <div className={`w-4 h-4 rounded-full mb-4 ${status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
          }`}></div>
        <div>{status === 'connecting' ? 'Connecting to live feed...' : 'Disconnected'}</div>
      </div>
    );
  }

  // Fallback in case we have a status, but no initial data yet
  if (!data) return null;

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6 relative">
      {/* Connection Status Indicator overlay */}
      <div className="absolute top-16 right-6 flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full shadow-lg border border-slate-700">
        <div className={`w-2.5 h-2.5 rounded-full ${status === 'connected' ? 'bg-green-500 animate-pulse' :
          status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
          }`}></div>
        <span className="text-xs font-medium text-slate-300 capitalize">
          {status}
        </span>
      </div>

      <Header data={data} />

      {/* Row 1: 3 equal columns */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        <ImageAnalysis data={data} />
        <SARUpdates data={data} />
        <ImpactZones data={data} />
      </div>

      {/* Row 2: 1 col left + 2 col right */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <ResourceStatus data={data} />
        <ActionsPanel data={data} />
      </div>
    </div>
  );
}