"use client";
import { Pixi } from "./_components/test-canvas/Pixi";

export default function Home() {
  const a = (name: string) => () => console.log(name);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Pixi onClick={() => console.log("click")} />
    </main>
  );
}
