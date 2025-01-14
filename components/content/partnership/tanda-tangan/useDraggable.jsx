import { useState, useEffect } from "react";

export default function useDraggable(el) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    const handleMouseDown = (event) => {
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;

      const handleMouseMove = (event) => {
        const newDx = event.pageX - startX;
        const newDy = event.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };

      document.addEventListener("mousemove", handleMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

    el && el?.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      el && el?.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dx, dy,el]);

  useEffect(() => {
    if(el.current){
      el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
  }, [dx, dy,el]);
}
