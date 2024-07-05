import Link from "next/link";


export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 ">
      <Link href="/editor" className="text-5xl underline hover:cursor-pointer">Go to Editor.js </Link>
    </main>
  );
}
