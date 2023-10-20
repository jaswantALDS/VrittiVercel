import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import CardPrototype from "./CardPrototype";

type TIcon = {
  icon: IconType;
  href: string;
  color?: string;
  bgColor?: string;
};

type TCard = {
  title: string;
  subtitle: string;
  cardImage?: StaticImport | string;
  icons?: TIcon[];
  iconLimit?: number;
};

export default function Card({
  title,
  subtitle,
  cardImage,
  icons,
  iconLimit = 3,
}: TCard) {
  const image =
    typeof cardImage == "string" ? JSON.parse(cardImage) : cardImage;
  const allIcons = icons;

  const renderIconData = (iconData: TIcon) => {
    const Icon = iconData.icon;
    return (
      <Link
        href={iconData.href}
        className={`h-8 w-8 flex items-center justify-center ${
          iconData.bgColor ? `text-[${iconData.bgColor}]` : "bg-secondary"
        }  rounded-full cursor-pointer hover:bg-opacity-70 transition-all`}
      >
        <Icon
          className={`${
            iconData.color ? `text-[${iconData.color}]` : "text-primary"
          } text-lg"`}
        />
      </Link>
    );
  };

  return (
    <CardPrototype className="flex justify-between flex-wrap">
      <div className="w-3/4 flex flex-col flex-wrap justify-between items-stretch">
        <div>
          <h2 className="text-xl line-clamp-1">{title}</h2>
          <h3 className="text-gray-500 text-xs line-clamp-2">{subtitle}</h3>
        </div>
        {icons?.length && (
          <ul className="flex space-x-1">
            {icons.splice(0, iconLimit).map((icon, index) => (
              <li key={index}>{renderIconData(icon)}</li>
            ))}
            {/* 
            {allIcons!.splice(0, iconLimit).length > allIcons!.length && (
              <li key="others">others</li>
            )} */}
          </ul>
        )}
      </div>
      {cardImage && (
        <div className="relative w-1/4 bg-secondary rounded-full h-full">
          <Image src={image} alt={title} className="rounded-full" />
        </div>
      )}
    </CardPrototype>
  );
}
