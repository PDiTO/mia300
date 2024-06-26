"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AvatarDisplay from "./components/AvatarDisplay";
import { Nft } from "./types/Nft";
import { backgrounds } from "./config/backgrounds";
import BackgroundSelector from "./components/BackgroundSelector";
import NFTSelector from "./components/NftSelector";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [selectedBackground, setSelectedBackground] =
    useState<string>("Beauty kanji.png");
  const [selectedNft, setSelectedNft] = useState<Nft | null>(null);

  const { address, isConnected } = useAccount();

  const tempAddress = "0x10b15282653647F5E7038d5433cFA04F9aeC1fe0";
  const contractAddress = "0x2b081427b51d471C02f865f16673caEb3Acc7F9e";

  useEffect(() => {
    const fetchNfts = async () => {
      setLoading(true);

      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(
          `https://eth-mainnet.g.alchemy.com/nft/v3/lYSVBdC4aqSN6MVbypL5582w_ilGSCMr/getNFTsForOwner?owner=${address}&contractAddresses[]=${contractAddress}&withMetadata=true&pageSize=100`,
          options
        );
        const data = await response.json();
        setNfts(data.ownedNfts);
        if (data && data.ownedNfts && data.ownedNfts.length > 0) {
          setSelectedNft(data.ownedNfts[0]);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Please connect your wallet to customise your PFP.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!nfts || (nfts && nfts.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>No NFTs found for connected wallet.</div>
      </div>
    );
  }

  if (nfts && nfts.length > 0 && selectedNft) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start mx-4">
        <div className="max-w-96">
          <div className="h-24 "></div>
          {nfts.length > 1 && (
            <NFTSelector nfts={nfts} onSelect={setSelectedNft} />
          )}
          <BackgroundSelector
            backgrounds={backgrounds}
            onSelect={setSelectedBackground}
          />
          <AvatarDisplay
            avatarImage={selectedNft?.image.pngUrl}
            selectedBackground={`/background/${selectedBackground}`}
          />
          <div className="h-24 "></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Error. Please try later.</div>
    </div>
  );
};

export default Home;
