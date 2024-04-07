import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 z-30 w-full bg-custom-bg">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex gap-3 items-center">
          <Image
            src="/logos/logo.png"
            alt="Mia300 Logo"
            className="rounded-full"
            width={40}
            height={40}
          />
          <div className="font-bold text-lg">Mia300</div>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="https://opensea.io/collection/mia300" target="_blank">
            <Image
              src="/logos/opensea.svg"
              alt="Opensea Logo"
              width={30}
              height={30}
            />
          </Link>
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </div>
  );
}
