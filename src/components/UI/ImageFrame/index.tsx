import { ManIcon, WomenIcon } from "../IconGenerator/Svg";

const ImageFrame = ({
  image = "",
  gender = "",
}: {
  image: any;
  classes?: string;
  gender?: string;
}) => {
  return (
    <div className="w-[20px] h-[20px] flex items-center justify-center">
      {image ? (
        <img
          className="rounded-[8px] block object-cover w-[40px] h-[40px]"
          src={image}
          alt={"image"}
          loading="lazy"
        />
      ) : gender === "m" ? (
        <ManIcon />
      ) : (
        <WomenIcon />
      )}
    </div>
  );
};

export default ImageFrame;
