export interface Nft {
  name: string;
  tokenId: string;
  image: {
    cachedUrl: string;
    originalUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
  };
}
