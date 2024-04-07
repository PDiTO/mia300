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
        // Display a loading message
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "96px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);

        let backgroundLoaded = false;
        let avatarLoaded = false;
        const background = new Image();
        const avatar = new Image();

        // Function to check if both images are loaded
        const tryDrawImages = () => {
          if (backgroundLoaded && avatarLoaded) {
            // Both images have loaded, clear the canvas and draw them
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
            // Update the download URL
            setDownloadUrl(canvas.toDataURL("image/png"));
          }
        };

        // Load and draw the background
        background.src = selectedBackground;
        background.onload = () => {
          backgroundLoaded = true;
          tryDrawImages(); // Check if it's time to draw the images
        };
        background.onerror = () => {
          console.error("Failed to load background image");
        };

        // Load and draw the avatar image on top of the background
        avatar.crossOrigin = "anonymous"; // Use this for CORS if needed
        avatar.src = avatarImage;
        avatar.onload = () => {
          avatarLoaded = true;
          tryDrawImages(); // Check if it's time to draw the images
        };
        avatar.onerror = () => {
          console.error("Failed to load avatar image");
        };
      }
    }
  }, [selectedBackground, avatarImage]);

  const handleDownload = (size: "full" | "small"): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      let dataUrl;
      if (size === "small") {
        // Resize for small download
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = 512;
        offscreenCanvas.height = 512;
        const offCtx = offscreenCanvas.getContext("2d");
        if (offCtx) {
          offCtx.drawImage(canvas, 0, 0, 512, 512);
          dataUrl = offscreenCanvas.toDataURL("image/png");
        }
      } else {
        // Use the original size
        dataUrl = canvas.toDataURL("image/png");
      }

      if (dataUrl) {
        // Use a different approach based on the platform.
        // This is a simplistic check and might need adjustments for your specific needs.
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          // For mobile devices, open the image in a new tab.
          // Users can save the image manually from there.
          window.open(dataUrl, "_blank");
        } else {
          // For desktop browsers, use the download attribute for automatic downloading.
          const link = document.createElement("a");
          link.download = `avatar-${size}.png`;
          link.href = dataUrl;
          document.body.appendChild(link); // This line is optional and can be removed if not needed
          link.click();
          document.body.removeChild(link); // This line is optional and can be removed if not needed
        }
      }
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
