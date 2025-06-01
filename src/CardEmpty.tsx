import React from "react";

const WIDTH = 1050;
const HEIGHT = 600;
// const BORDER_WIDTH = 30;
// const RIGHT_BORDER = WIDTH - BORDER_WIDTH;
// const LEFT_BORDER = BORDER_WIDTH;
// const BOTTOM_BORDER = HEIGHT - BORDER_WIDTH;

export default function EmptyCards({ count }: { count: number }) {
  return Array(count)
    .fill(null)
    .map((_, index) => <CardEmpty key={index} />);
}

function CardEmpty() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const $canvas = ref.current;
    const ctx = $canvas?.getContext("2d");
    if (!ctx || !$canvas) return;
    if (!$canvas || !ctx) return;
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(0, 0, 1050, 600);
  }, [ref]);
  return <canvas width={WIDTH} height={HEIGHT} ref={ref}></canvas>;
}
