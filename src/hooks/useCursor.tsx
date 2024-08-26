// cursor.tsx
import { useState, useEffect } from "react";

export interface CursorData {
  visible: boolean;
  x: number;
  y: number;
  name: string;
  value: string;
}

export const useCursor = () => {
  const [cursorData, setCursorData] = useState<CursorData>({
    visible: false,
    x: 0,
    y: 0,
    name: "",
    value: "",
  });
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleMouseMove = (
    e: React.MouseEvent,
    name: string,
    value: string,
  ) => {
    setIsFadingOut(false);
    setCursorData({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      name,
      value,
    });
  };

  const handleMouseLeave = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCursorData({ visible: false, x: 0, y: 0, name: "", value: "" });
    }, 300);
  };

  return { cursorData, handleMouseMove, handleMouseLeave, isFadingOut };
};
