import { fabric } from "fabric";
import { skip } from "node:test";
import { useEvent } from "react-use";
interface UseHotKeyProps {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
}

export const useHotKeys = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: UseHotKeyProps) => {
  useEvent("keydown", (event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isBackSpace = event.key === "Backspace";

    const isInput = ["INPUT", "TEXTAREA"].includes(
      (event.target as HTMLElement).tagName
    );

    if (isInput) return;

    if (isBackSpace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }
    if (isCtrlKey && event.key === "z") {
      event.preventDefault();
      undo();
    }
    if (isCtrlKey && event.key === "y") {
      event.preventDefault();
      redo();
    }

    if (isCtrlKey && event.key === "s") {
      event.preventDefault();
      save(true);
    }

    if (isCtrlKey && event.key === "c") {
      event.preventDefault();
      copy();
    }
    if (isCtrlKey && event.key === "v") {
      event.preventDefault();
      paste();
    }
    if (isCtrlKey && event.key === "a") {
      event.preventDefault();
      canvas?.discardActiveObject();
      const activeObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);
      canvas?.setActiveObject(
        new fabric.ActiveSelection(activeObjects, { canvas })
      );
      canvas?.renderAll();
    }
  });
};
