import Image, { StaticImageData } from "next/image";

function LeftImage({ image }: { image: StaticImageData }) {
  return (
    <Image
      src={image}
      // width={1280}
      // height={843}
      fill
      alt="Authentication"
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}

export default LeftImage;
