import Image from "next/image";

interface BackgroundSelectorProps {
  backgrounds: string[];
  onSelect: (url: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  backgrounds,
  onSelect,
}) => (
  <div className="flex flex-row gap-1 mb-4 overflow-x-auto">
    {backgrounds.map((backgroundUrl) => (
      <button
        className="shrink-0"
        key={backgroundUrl}
        onClick={() => onSelect(backgroundUrl)}
      >
        <Image
          className="rounded-sm"
          src={`/background/thumbs/${backgroundUrl}`}
          alt="Background"
          width={55}
          height={55}
        />
      </button>
    ))}
  </div>
);

export default BackgroundSelector;
