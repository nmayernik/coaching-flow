import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-semibold text-gray-800">Page not found</h1>
      <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-blue-800 hover:bg-yellow-400"
      >
        Go home
      </Link>
    </div>
  );
}
