import { Application, Assets, Sprite, Graphics } from "pixi.js";
import { FC, useEffect, useRef } from "react";

export const Pixi: FC<{ onClick: () => void }> = ({ onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      const app = new Application({ width: 200, height: 200 });
      app.view.id = "pixi";
      app.view.dataset.testid = "pixi";
      // const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
      // const bunny = new Sprite(texture);
      const graphics = new Graphics();
      graphics.beginFill(0xde3249);
      graphics.drawRect(0, 0, 100, 100);
      graphics.endFill();

      graphics.eventMode = "static";
      graphics.cursor = "pointer";

      graphics.on("pointerdown", onClick);

      app.stage.addChild(graphics);
      // Center the sprite's anchor point
      // bunny.anchor.set(0.5);

      // Move the sprite to the center of the screen
      graphics.x = app.screen.width / 4;
      graphics.y = app.screen.height / 4;
      ref.current?.appendChild(app.view);
    })();
  }, [onClick]);
  return <div ref={ref} />;
};
