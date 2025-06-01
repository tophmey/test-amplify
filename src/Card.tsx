import React from "react";
import { data } from "./Data";

const WIDTH = 1050;
const HEIGHT = 600;
const BORDER_WIDTH = 30;
const RIGHT_BORDER = WIDTH - BORDER_WIDTH;
// const LEFT_BORDER = BORDER_WIDTH;
const BOTTOM_BORDER = HEIGHT - BORDER_WIDTH;

type CardProps = {
  name: string;
  size: string;
  isLocal?: boolean;
  isRaw?: boolean;
};

const sizes = data.controls.sizes;

export default function CardFront({
  name = "",
  size = "",
  isLocal = name &&
  data.varieties[name] !== "default" &&
  "isLocal" in data.varieties[name]
    ? data.varieties[name].isLocal
    : data.controls.isLocal, // data[name]?.isLocal || data.controls.isLocal,
  isRaw = name &&
  data.varieties[name] !== "default" &&
  "isRaw" in data.varieties[name]
    ? data.varieties[name].isRaw
    : data.controls.isRaw,
}: CardProps) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const $canvas = ref.current;
    const ctx = $canvas?.getContext("2d");
    if (!$canvas || !ctx) return;
    const img = new Image();
    img.addEventListener("load", () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 1050, 600);
      ctx.font = "bold 31px Times New Roman";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        `${isRaw ? "Raw " : ""} ${isLocal ? "Local " : ""}Honey`,
        150,
        BORDER_WIDTH * 2
      );
      ctx.fillText(name, 150, 110);
      ctx.textAlign = "left";
      ctx.font = "24px Times New Roman";
      const lineHeight = 36;
      ctx.fillText("worldohoney.com", 20, BOTTOM_BORDER);
      ctx.fillText("Silverdale, PA 18962", 20, BOTTOM_BORDER - lineHeight);
      ctx.fillText("Box 177", 20, BOTTOM_BORDER - lineHeight * 2);
      ctx.fillText("World O' Honey, Inc.", 20, BOTTOM_BORDER - lineHeight * 3);
      ctx.drawImage(img, 325, 80, 400, 400);
      ctx.textAlign = "center";
      ctx.fillText("Packaged By", 525, 50);
      ctx.fillText(`Licensed by PA Dept of Ag.`, 525, BOTTOM_BORDER);
      if (size) {
        ctx.textAlign = "right";
        ctx.font = "bold 24px Times New Roman";
        ctx.fillText(`Net Wt. ${sizes[+size]}`, RIGHT_BORDER, BOTTOM_BORDER);
      }
    });
    img.src = "/woh-logo.png";
    return () => {
      ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    };
  }, [ref, name, size, isLocal]);
  return <canvas width={WIDTH} height={HEIGHT} ref={ref}></canvas>;
}
