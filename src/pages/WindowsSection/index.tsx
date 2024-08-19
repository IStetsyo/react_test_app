import React, { useState, useEffect } from "react";
import { useWindows } from "../../hooks/useWindows";

export const WindowsSection = () => {
  const { windows, moveWindow, resizeWindow, bringToFront, resetWindows } =
    useWindows();

  const [resizing, setResizing] = useState<{
    id: number;
    direction: "right" | "bottom" | null;
  }>({
    id: 0,
    direction: null,
  });

  const handleMouseDown = (id: number) => {
    bringToFront(id);
  };

  const handleResizeStart = (
    id: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: "right" | "bottom"
  ) => {
    e.preventDefault();
    setResizing({ id, direction });
  };

  const handleDragEnd = (
    id: number,
    event: React.DragEvent<HTMLDivElement>
  ) => {
    const left = event.clientX - event.currentTarget.offsetWidth / 2;
    const top = event.clientY - event.currentTarget.offsetHeight / 2;
    moveWindow(id, left, top);
  };

  const handleResize = (event: MouseEvent) => {
    if (resizing.id && resizing.direction) {
      const window = windows.find((window) => window.id === resizing.id);
      if (window) {
        const newWidth =
          resizing.direction === "right"
            ? event.clientX - window.left
            : window.width;
        const newHeight =
          resizing.direction === "bottom"
            ? event.clientY - window.top
            : window.height;
        resizeWindow(resizing.id, newWidth, newHeight);
      }
    }
  };

  const handleResizeEnd = () => {
    setResizing({ id: 0, direction: null });
  };

  useEffect(() => {
    if (resizing.direction) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [resizing]);

  return (
    <div className="relative w-full h-screen bg-gray-500">
      {windows.map((window) => (
        <div
          key={window.id}
          draggable
          onDragEnd={(e) => handleDragEnd(window.id, e)}
          onMouseDown={() => handleMouseDown(window.id)}
          className="absolute w-40 h-20 bg-blue-500  rounded-md cursor-pointer border border-white text-white flex items-center justify-center"
          style={{
            left: `${window.left}px`,
            top: `${window.top}px`,
            zIndex: window.zIndex,
            width: `${window.width}px`,
            height: `${window.height}px`,
          }}
        >
          Window {window.id}
          <div
            onMouseDown={(e) => handleResizeStart(window.id, e, "right")}
            className="absolute right-0 top-0 w-2 h-full cursor-ew-resize bg-transparent"
          />
          <div
            onMouseDown={(e) => handleResizeStart(window.id, e, "bottom")}
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize bg-transparent"
          />
        </div>
      ))}
      <button
        onClick={resetWindows}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset Blocks
      </button>
    </div>
  );
};
