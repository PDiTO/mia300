import { useEffect, useRef, useState, FC } from "react";

interface AvatarDisplayProps {
  selectedBackground: string;
  avatarImage: string;
}

const AvatarDisplay: FC<AvatarDisplayProps> = ({
  selectedBackground,
  avatarImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Load and draw the background
        const background = new Image();
        background.src = selectedBackground;
        background.onload = () => {
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          // Load and draw the avatar image on top of the background
          const avatar = new Image();
          avatar.crossOrigin = "anonymous";
          avatar.src = avatarImage;
          avatar.onload = () => {
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
            // Update the download URL
            setDownloadUrl(canvas.toDataURL("image/png"));
          };
        };
      }
    }
  }, [selectedBackground, avatarImage]);

  const handleDownload = (size: "full" | "small"): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      let link = document.createElement("a");
      link.download = `avatar-${size}.png`;
      if (size === "small") {
        // Resize for small download
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = 512;
        offscreenCanvas.height = 512;
        const offCtx = offscreenCanvas.getContext("2d");
        if (offCtx) {
          offCtx.drawImage(canvas, 0, 0, 512, 512);
          link.href = offscreenCanvas.toDataURL("image/png");
        }
      } else {
        // Use the original size
        link.href = canvas.toDataURL("image/png");
      }
      link.click();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <canvas
        className="rounded-md"
        ref={canvasRef}
        width={3000}
        height={3000}
        style={{ width: "100%", height: "auto" }}
      ></canvas>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className="bg-indigo-500 rounded-md px-4 py-2 w-1/2 font-medium"
          onClick={() => handleDownload("small")}
        >
          Download (sm)
        </button>
        <button
          className="bg-indigo-500 rounded-md px-4 py-2 w-1/2 font-medium"
          onClick={() => handleDownload("full")}
        >
          Download (lg)
        </button>
      </div>
    </div>
  );
};

export default AvatarDisplay;
