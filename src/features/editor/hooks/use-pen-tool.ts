import React, { useState } from "react";

interface Point {
  x: number;
  y: number;
}

export const usePenTool = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const startDrawing = (e: React.MouseEvent) => {
    const point = { x: e.clientX, y: e.clientY };
    setPoints([point]);
    setIsDrawing(true);
  };

  const continueDrawing = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const newPoint = { x: e.clientX, y: e.clientY };
    setPoints((prev) => [...prev, newPoint]);
  };

  const finishDrawing = () => {
    if (points.length > 3) {
      // Close the shape by connecting to first point
      setPoints((prev) => [...prev, prev[0]]);
    }
    setIsDrawing(false);
  };
  return { points, isDrawing, startDrawing, continueDrawing, finishDrawing };
};
