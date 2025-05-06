import { useEffect, useRef, useState } from "react";
import {
  DeleteIcon,
  DotsIcon,
  ImageFrame,
  EditIcon,
} from "../../UI/IconGenerator/Svg";
import fileService from "../../../services/fileService";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircularProgress } from "@mui/material";
import CLabel from "../CLabel";
// import { RxCross2 } from "react-icons/rx";
import { Closer } from "../../../components/UI/Closer";
import { useTranslation } from "react-i18next";

interface Props {
  error?: any;
  isDelete?: boolean;
  defaultValue?: string;
  name: string;
  text?: string;
  label?: string;
  readOnly?: boolean;
  setValue?: (val?: any, val2?: any) => void;
  style?: any;
  zoomImg?: boolean;
  required?: boolean;
  onChange?: any;
}

export const DImageUploadUI = ({
  error,
  isDelete = false,
  defaultValue = "",
  name,
  setValue = () => {},
  text = "",
  readOnly = false,
  label = "",
  zoomImg = false,
  required = false,
  onChange = () => {},
}: Props) => {
  const inputRef: any = useRef(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageTool, setImageTool] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const { t } = useTranslation();
  const inputChangeHandler = (e: any) => {
    setLoading(true);
    const file = e?.target.files[0];

    const data = new FormData();

    data.append("file", file);

    fileService
      .upload(data)
      .then((res: any) => {
        setValue(name, res?.data.data?.id);
        setImage(res?.data?.data?.original_url);
        onChange(res?.data.data?.id);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const updateImage = (e: any) => {
    e.stopPropagation();
    if (!readOnly) {
      inputRef.current.click();
      setImageTool(false);
    }
  };

  const deleteImage = (e: any) => {
    e.stopPropagation();
    setImage("");
    setImageTool(false);
    defaultValue = "";
  };

  const handlerZoom = (e: any) => {
    setViewImage(e);
    // navigateQuery({ show: "show", img: e });
  };
  // console.log(zoom);

  useEffect(() => {
    if (defaultValue) setImage(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <div className="flex flex-col relative">
        {label ? (
          <div className="flex items-center justify-between">
            <CLabel title={label} required={required} />
            <div className="relative" onClick={() => setImageTool(true)}>
              <DotsIcon />
              {imageTool && (
                <div className="bg-white divide-y-[1px] absolute top-[7px] right-0 z-10 rounded-xl border border-[var--softgray]">
                  <div
                    onClick={updateImage}
                    className="flex items-center relative z-20 gap-2 p-2 hover:bg-[var(--lineGray)] rounded-t-xl cursor-pointer"
                  >
                    <EditIcon fill="#858592" />
                    <p className="text-xs font-normal text-[var(--gray)]">
                      {t("upload_image")}
                    </p>
                  </div>
                  <div
                    onClick={deleteImage}
                    className="flex items-center gap-2 p-2  hover:bg-[var(--lineGray)] cursor-pointer rounded-b-xl"
                  >
                    <DeleteIcon fill="#858592" />
                    <p className="text-xs font-normal text-[var(--gray)]">
                      {t("delete_image")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <div
          onClick={updateImage}
          className={`cursor-pointer flex overflow-hidden text-[var(--gray)] font-medium border border-[var(--lineGray)] rounded-[8px] h-[80px] bg-[var(--lightGray)] flex-col justify-center items-center w-full`}
        >
          <span>{text}</span>
          {defaultValue || (image && !loading) ? (
            <div
              className=" w-full h-full transition-all duration-300 hover:scale-[1.2]"
              onClick={() => handlerZoom(image)}
            >
              <img
                className={`h-full  w-full object-cover `}
                src={image ? image : defaultValue}
                alt={defaultValue || "image"}
              />
            </div>
          ) : loading ? (
            <CircularProgress />
          ) : (
            <ImageFrame />
          )}
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e: any) => [inputChangeHandler(e)]}
            accept=".png, .jpg, .jpeg"
          />

          {isDelete ? (
            <button onClick={(e) => deleteImage(e)}>
              <CancelIcon />
            </button>
          ) : (
            ""
          )}
        </div>

        {error?.message && (
          <p className="text-sm text-[var(--error)] absolute left-1 -bottom-5 whitespace-nowrap">
            {error.message}
          </p>
        )}

        {zoomImg && !!viewImage && (
          <div className="w-full h-full fixed top-0 left-0 z-[99]">
            <div className="border flex justify-center items-center h-full">
              <img
                src={`${decodeURIComponent(viewImage)}`}
                alt="img"
                className="z-50 max-h-[95vh] min-h-[70vh]"
              />
              <div
                onClick={() => {
                  setViewImage("");
                }}
                className="bg-white rounded-lg inline-block p-[10px] absolute top-10 right-10 z-[99]"
              ></div>
            </div>
            <div className="bg-black/20 w-full h-full fixed top-0 left-0" />
          </div>
        )}
      </div>
      {!!viewImage && (
        <Closer handleClose={() => setViewImage("")} classes="z-[99]" />
      )}

      {imageTool && (
        <div
          onClick={() => setImageTool(false)}
          className="h-full w-full fixed top-0 left-0   bg-transparent"
        />
      )}
    </>
  );
};
