import Image from "next/image";
import { FC } from "react";

interface IProps {
    size: "small" | "medium" | "large";
    src: string;
    pageTitle: string;
    description: string;
    subtitle?: string;
    variant?: string;
}

const CoverImage: FC<IProps> = ({
    size,
    src,
    pageTitle,
    description,
    subtitle,
    variant,
}) => {
    return (
        <div className="row mb-5">
            <div className={`CoverImage ${variant && `CoverImage${variant}`}`}>
                <div className="CoverImage__overlay">
                    <div
                        className="CoverImage__text container"
                        style={{ verticalAlign: "middle" }}
                    >
                        <h1 style={{ fontSize: 40 }}>{pageTitle}</h1>
                        {subtitle ? (
                            <p style={{ fontSize: 24 }}>
                                {subtitle}
                                <br />
                                {description}
                            </p>
                        ) : (
                            <p style={{ fontSize: 24 }}>{description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverImage;
