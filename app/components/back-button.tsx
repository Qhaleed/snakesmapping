import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="fixed top-5 left-4 z-[1002] bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:bg-gray-100"
    >
      <span className="text-black text-lg">← Back</span>
    </button>
  );
}