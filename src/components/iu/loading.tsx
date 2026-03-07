import { FondoHero } from "../landing/Hero/fondo-hero"
import { Loader } from "lucide-react";

export default function Loading(){
    return(
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <FondoHero/>
            <div className="absolute inset-0 bg-linear-to-t from-[#010112] via-[#010112]/60 to-[#010112]/30 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-5 px-12 py-10 rounded-2xl">
            <Loader className="w-20 h-20 text-blue-500 animate-spin" />
            <p className="text-blue-500/80 text-2xl py-6 font-medium tracking-wide animate-pulse">
                Cargando...
            </p>
           
        </div>
      </div>
    );
}