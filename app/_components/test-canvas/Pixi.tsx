import { Application, Assets, Sprite } from "pixi.js";
import { FC, useEffect, useRef } from "react";

export const Pixi: FC<{ onClick: () => void }> = ({ onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      const app = new Application({ width: 256, height: 256 });
      app.view.id = "pixi";
      ref.current?.appendChild(app.view);
      const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
      const bunny = new Sprite(texture);
      bunny.eventMode = "static";
      bunny.cursor = "pointer";

      bunny.on("pointerdown", onClick);

      app.stage.addChild(bunny);
      // Center the sprite's anchor point
      bunny.anchor.set(0.5);

      // Move the sprite to the center of the screen
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;
      bunny.scale.set(3);

      for (let i = 0; i < 1000; i += 10) {
        for (let j = 0; j < 1000; j += 10) {
          document.querySelector("#pixi")?.dispatchEvent(
            new MouseEvent("pointerdown", {
              clientX: i,
              clientY: j,
            })
          );
        }
      }
    })();
  }, [onClick]);
  return <div ref={ref} />;
};
