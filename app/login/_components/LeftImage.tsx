import Image from "next/image";

function LeftImage() {
  return (
    <div className="md:hidden">
      <Image
        src="/examples/authentication-light.png"
        width={1280}
        height={843}
        alt="Authentication"
        className="block dark:hidden"
      />
      <Image
        src="/examples/authentication-dark.png"
        width={1280}
        height={843}
        alt="Authentication"
        className="hidden dark:block"
      />
    </div>
  );
}

export default LeftImage;
