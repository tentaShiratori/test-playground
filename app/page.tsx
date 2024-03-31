import { Slider } from "@/components/ui/slider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoge",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hoge</h1>
      <Slider />
    </main>
  );
}
