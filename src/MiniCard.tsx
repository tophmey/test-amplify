import React from "react";

const WIDTH = 131;
const HEIGHT = 75;
const BORDER_WIDTH = 10;
// const RIGHT_BORDER = WIDTH - BORDER_WIDTH;
// const LEFT_BORDER = BORDER_WIDTH;
// const BOTTOM_BORDER = HEIGHT - BORDER_WIDTH;

type CardProps = {
  name: string;
  size: string;
};

export default function MiniCard({ name = "", size = "" }: CardProps) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const $canvas = ref.current;
    const ctx = $canvas?.getContext("2d");
    if (!$canvas || !ctx) return;
    const img = new Image();
    img.addEventListener("load", () => {
      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.font = "12px Times New Roman";
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.globalAlpha = 0.3;
      ctx.drawImage(img, 70, 10, 50, 50);
      ctx.globalAlpha = 1;
      ctx.fillText(name, BORDER_WIDTH, BORDER_WIDTH * 2);
      ctx.fillText(size, BORDER_WIDTH, BORDER_WIDTH * 4);
    });
    img.src = "/woh-logo.png";
    return () => {
      ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    };
  }, [ref, name, size]);
  return <canvas width={WIDTH} height={HEIGHT} ref={ref}></canvas>;
}
