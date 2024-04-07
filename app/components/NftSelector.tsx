import Image from "next/image";
import { Nft } from "../types/Nft";

interface NFTSelectorProps {
  nfts: Nft[];
  onSelect: (nft: Nft) => void;
}

const NFTSelector: React.FC<NFTSelectorProps> = ({ nfts, onSelect }) => (
  <div className="flex flex-row gap-1 mb-4 overflow-x-auto">
    {nfts.map((nft) => (
      <button
        className="shrink-0"
        key={nft.tokenId}
        onClick={() => onSelect(nft)}
      >
        <Image
          className="rounded-sm"
          src={`${nft.image.thumbnailUrl}`}
          alt="NFT Image"
          width={55}
          height={55}
        />
      </button>
    ))}
  </div>
);

export default NFTSelector;
