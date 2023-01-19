import Image from "next/image";

type CoverImageProps = {
    size: "small" | "medium" | "large";
    src: string;
}

function CoverImage({ size, src }: CoverImageProps) {
    // TODO: Determine size of image

  return (
    <div className="CoverImage" style={{ paddingTop: 2}}>
      <Image fill src={src} alt="" />
      <div className="CoverImage__text">
        <h1>About us</h1>
        <p>Meet the experts in moving and storage</p>
    </div>
    </div>
  )
}

export default CoverImage
