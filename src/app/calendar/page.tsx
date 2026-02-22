import { UserButton } from "@clerk/nextjs";
import { fetchDailyActivities } from "../../../lib/calendarAction";
export default async function DashboardTemporal() {

  return (
    <div className="min-h-screen bg-[#100F1D] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">¡Autenticación exitosa!</h1>
      
      <p className="text-gray-400 mb-8 text-center max-w-md text-lg">
        Esta será la vista principal de la agenda. Aquí es donde eventualmente se cargarán las actividades del día a día y la lista de tareas priorizadas.
      </p>
      

      <div className="bg-[#1e293b]/50 p-4 rounded-xl border border-blue-900/50 flex flex-col items-center gap-4">
        <span className="text-gray-300">Gestiona tu sesión actual:</span>
        <UserButton  />
      </div>
      
    </div>
  );
}