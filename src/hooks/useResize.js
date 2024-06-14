import { useEffect } from "react";

export default function useResize(
  containerRef,
  dragRef,
  onDrag,
  onStop,
  onLowerLimit
) {
  useEffect(() => {
    const onMouseDown = (e) => {
      const initialX = e.clientX;
      const initialWidth = containerRef.current.offsetWidth;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      window.getSelection().removeAllRanges();

      function onMouseMove(e) {
        const currentX = e.clientX;
        const width = initialWidth + (currentX - initialX);

        if (width >= 170 && width <= 470) {
          onDrag(width);
          containerRef.current.style.width = `${width}px`;
        } else if (width < 100) {
          onLowerLimit();
        }
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        onStop();
      }
    };

    dragRef.current.addEventListener("mousedown", onMouseDown);
  }, [containerRef, dragRef, onDrag, onStop]);
}
