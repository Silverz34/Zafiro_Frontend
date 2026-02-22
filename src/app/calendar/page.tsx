import { UserButton } from "@clerk/nextjs";
import DashboardLayout from "@/components/empaque";
export default async function DashboardTemporal() {
  return (
    <div className="min-h-screen bg-[#010112] text-white flex flex-col items-center justify-center">
      <DashboardLayout>
        <div className="border-2 border-dashed border-gray-800 rounded-xl h-full flex items-center justify-center text-gray-500">
          <h1>Aquí irá la cuadrícula principal de la agenda para los estudiantes y trabajadores</h1>
        </div>
      </DashboardLayout>
    </div>
  );
}