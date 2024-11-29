import { Editor } from "../types";

export const useImageDrop = (editor: Editor | undefined) => {
  const handleDrop = async (e: React.DragEvent, shape: SVGElement | null) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event.target?.result || !shape) return;

      const image = new Image();
      image.src = event.target.result as string;

      image.onload = () => {
        // Create a canvas for image masking
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = shape.clientWidth;
        canvas.height = shape.clientHeight;

        // Draw the shape as a mask
        ctx.beginPath();
        const path = shape.getAttribute("d");
        if (path) {
          const shapePath = new Path2D(path);
          ctx.clip(shapePath);
        }

        // Draw the image within the shape
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Add the masked image to the editor
        editor?.addImage(canvas.toDataURL());
      };
    };

    reader.readAsDataURL(file);
  };

  return { handleDrop };
};
