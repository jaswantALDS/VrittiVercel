import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage, { ImageProps } from "next/image";

export default function Image(props: ImageProps) {
  const imageURI =
    typeof props.src == "string" ? JSON.parse(props.src) : props.src;
  return <NextImage {...props} src={imageURI} />;
}
