import { useForm } from "react-hook-form";
import { CreateFunction } from "../Logic";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./validate";
import CModal from "../../../../../components/CElements/CModal";
import { CircularProgress } from "@mui/material";

interface Props {
  handleClose: () => void;
  newRouteList: any;
}

export const RouteCreate = ({
  handleClose = () => {},
  newRouteList = [],
}: Props) => {
  
  const schema = Validation();
  const { handleSubmit, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const { createRoute, isLoading } = CreateFunction({ handleClose, reset });

  const onSubmit = (data: any) => createRoute(data);

  return (
    <CModal
      title="Yangi route qo'shish"
      open={true}
      handleClose={() => handleClose()}
      footerActive={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <HFSelect
          name="name"
          options={options}
          control={control}
          handleClick={(val) => setValue("title", val.title)}
          placeholder="Route nomi"
        /> */}

        <div className="mt-5">
          {isLoading ? (
            <div className="custom-btn disabled form">
              <CircularProgress size={30} />
              Jo'natilmoqda
            </div>
          ) : (
            <button type="submit" className="custom-btn form">
              Tasdiqlash
            </button>
          )}
        </div>
      </form>
    </CModal>
  );
};
