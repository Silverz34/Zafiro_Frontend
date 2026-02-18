
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl border bg-[#100F1D]/50 hover:bg-[#171733] border-blue-600 transition-all duration-300 group">
      <div className="mb-4 p-3 bg-slate-900/50 w-fit rounded-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-2 text-slate-100">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}