import { AppAssets } from "@/constants/assets";
import Image from "next/image";

export default function ProfileBadge() {
  return (
    <div className="flex items-center">
      <div className="text-right mr-1">
        <div className="text-[14px] text-primary font-bold capitalize">
          Jhon Doe
        </div>
        <div className="text-xs text-gray-500 -mt-1">HR</div>
      </div>
      <div className="relative bg-secondary rounded-full">
        <Image
          src={AppAssets.avatar}
          height={40}
          width={40}
          className="rounded-full"
          alt=""
        />
      </div>
    </div>
  );
}
