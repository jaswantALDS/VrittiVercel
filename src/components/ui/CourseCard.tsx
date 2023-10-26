import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import CardPrototype from "./CardPrototype";

type TIcon = {
  //   icon: IconType;
  href: string;
  color?: string;
  bgColor?: string;
};

type TCard = {
  title: string;
  playTime: string;
  price: string;
  cardImage?: StaticImport | string;
  href: any;
};

export default function CourseCard({
  title,
  playTime,
  cardImage,
  price,
  href,
}: TCard) {
  const image =
    typeof cardImage == "string" ? JSON.parse(cardImage) : cardImage;

  return (
    <CardPrototype>
      <div className="w-full h-full ">
        <div className="border w-full h-32 overflow-hidden rounded-lg">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="fill"
              objectPosition="center"
            />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-md line-clamp-1">{title}</h2>
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <h3 className="text-gray-500 text-xs line-clamp-2 ">
                {playTime} |
              </h3>{" "}
              <h3 className="text-gray-500 text-xs line-clamp-2 ">
                {" "}
                {price} Lessons
              </h3>
            </div>

            <Link
              href={href}
              className="bg-orange-400 p-2 text-xs rounded-md text-white"
            >
              {" "}
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </CardPrototype>
  );
}
