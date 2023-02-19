import { plot } from "nodeplotlib";

import Elevator from "./Elevator";

function main() {
  const e = new Elevator(2, 0.5);
  const desiredPos = 20; // meters
  const dt = 1e-3; // 100 milliseconds
  const allowedError = 1e-3; // 1 cm
  const positions: number[] = [];
  const stopPositions: number[] = [];
  while (Math.abs(e.position - desiredPos) > allowedError) {
    e.tick(desiredPos, dt);
    positions.push(e.position);
    stopPositions.push(e.stopPosition());
  }

  const x = positions.map((_, i) => i * dt);
  const plotData = [
    {
      x,
      y: positions,
      type: "scatter" as const,
    },
    {
      x,
      y: stopPositions,
      type: "scatter" as const,
    },
  ];
  plot(plotData);
}

main();
