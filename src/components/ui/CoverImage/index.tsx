import Image from "next/image";
import { FC } from "react";

interface IProps {
    size: "small" | "medium" | "large";
    src: string;
    pageTitle: string;
    description: string;
}

const CoverImage: FC<IProps> = ({ size, src, pageTitle, description }) => {

    return (
        <div className="row mb-5">
            <div className="CoverImage">
                <Image fill src={src} alt="" />
                <div className="CoverImage__text container">
                    <h1>{pageTitle}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default CoverImage
