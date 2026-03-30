import Header from "../components/layout/Header";
import ImageAnalysis from "../components/cards/ImageAnalysis";
import SARUpdates from "../components/cards/SARUpdates";
import ImpactZones from "../components/cards/ImpactZones";
import ResourceStatus from "../components/cards/ResourceStatus";
import ActionsPanel from "../components/cards/ActionsPanel";
import useFloodData from "../hooks/useFloodData";

export default function Dashboard() {
  const data = useFloodData();

  if (!data)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-lg">
        Loading...
      </div>
    );

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6">
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