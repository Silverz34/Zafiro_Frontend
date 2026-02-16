import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans dark:bg-[var(--background)]">
      <header className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <Image src="/logo.png" alt="Zafiro Logo" width={32} height={32} className="h-8 w-auto" />
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm hover:text-blue-400 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
            Register
          </Link>
        </div>
      </header>

    </div>
  );
}
