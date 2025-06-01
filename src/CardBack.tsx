import React from "react";

const WIDTH = 1050;
const HEIGHT = 600;
const BORDER_WIDTH = 30;
const RIGHT_BORDER = WIDTH - BORDER_WIDTH;
// const LEFT_BORDER = BORDER_WIDTH;
const BOTTOM_BORDER = HEIGHT - BORDER_WIDTH;
const dimensions = {
  bee: [468, 510],
  beekeeper: [388, 466],
};
let imageName: string = "";
imageName = "beekeeper";
imageName = "bee";

export default function CardBack() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const $canvas = ref.current;
    const ctx = $canvas?.getContext("2d");
    if (!ctx || !$canvas) return;
    const image = new Image();
    image.addEventListener("load", () => {
      if (!$canvas || !ctx) return;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 1050, 600);
      // ctx.drawImage(
      //   image,
      //   RIGHT_BORDER - 250,
      //   BOTTOM_BORDER - 320,
      //   dimensions[imageName][0] * 0.6,
      //   dimensions[imageName][1] * 0.6
      // );
      ctx.drawImage(
        image,
        RIGHT_BORDER - 220,
        BOTTOM_BORDER - 400,
        dimensions["bee"][0] * 0.2,
        dimensions["bee"][1] * 0.2
      );
      // ctx.drawImage(
      //   image,
      //   BORDER_WIDTH * 3,
      //   BOTTOM_BORDER - 420,
      //   dimensions["bee"][0] * 0.4,
      //   dimensions["bee"][1] * 0.4
      // );
      ctx.font = "bold 36px Times New Roman";
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.fillText("DO NOT", BORDER_WIDTH, BORDER_WIDTH * 3);
      ctx.font = "36px Times New Roman";
      ctx.fillText(
        "feed honey products to infants under 1 year of age.",
        BORDER_WIDTH * 6,
        BORDER_WIDTH * 3
      );
      ctx.font = "30px Times New Roman";
      // ctx.textAlign = "right";
      // ctx.fillText(
      //   "If honey crystallizes place container in warm water.",
      //   RIGHT_BORDER,
      //   BOTTOM_BORDER - BORDER_WIDTH * 2
      // );
      ctx.fillText(
        "If honey crystallizes, place container in warm water.",
        BORDER_WIDTH,
        BOTTOM_BORDER - BORDER_WIDTH
      );
    });
    image.src = `/${imageName}.png`;
    return () => {
      ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    };
  }, [ref]);
  return <canvas width={WIDTH} height={HEIGHT} ref={ref}></canvas>;
}
