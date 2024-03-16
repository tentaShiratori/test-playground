"use client";
import { Video } from "./_components/test-video/Video";

export default function Home() {
  const a = (name: string) => () => console.log(name);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Video
        onPlay={a("play")}
        onSeeked={function () {
          a("seeked")();
          console.log(this.currentTime);
        }}
        onSeeking={a("seeking")}
      />
    </main>
  );
}
