import { useState } from "react";

type WindowsPosition = {
  id: number;
  top: number;
  left: number;
  zIndex: number;
  width: number;
  height: number;
};

const initialWindows: WindowsPosition[] = [
  { id: 1, top: 50, left: 50, zIndex: 1, width: 160, height: 80 },
  { id: 2, top: 50, left: 300, zIndex: 1, width: 160, height: 80 },
  { id: 3, top: 50, left: 550, zIndex: 1, width: 160, height: 80 },
  { id: 4, top: 200, left: 50, zIndex: 1, width: 160, height: 80 },
  { id: 5, top: 200, left: 300, zIndex: 1, width: 160, height: 80 },
];

export const useWindows = () => {
  const [windows, setWindows] = useState<WindowsPosition[]>(initialWindows);

  const moveWindow = (id: number, left: number, top: number) => {
    setWindows((windows) =>
      windows.map((window) =>
        window.id === id ? { ...window, left, top } : window
      )
    );
  };

  const resizeWindow = (id: number, width: number, height: number) => {
    setWindows((windows) =>
      windows.map((block) =>
        block.id === id ? { ...block, width, height } : block
      )
    );
  };

  const bringToFront = (id: number) => {
    const maxZIndex = Math.max(...windows.map((block) => block.zIndex));
    setWindows((windows) =>
      windows.map((block) =>
        block.id === id ? { ...block, zIndex: maxZIndex + 1 } : block
      )
    );
  };

  const resetWindows = () => {
    setWindows(initialWindows);
  };

  return { windows, moveWindow, resizeWindow, bringToFront, resetWindows };
};
