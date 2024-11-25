import { useForm } from "react-hook-form";
import { CreateFunction, GetOptions } from "../Logic";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./validate";
import CModal from "../../../../../components/CElements/CModal";
import { CircularProgress } from "@mui/material";
import HFSelect from "../../../../../components/HFElements/HFSelect";

interface Props {
  handleClose: () => void;
  newRouteList: any;
}

export const RouteCreate = ({
  handleClose = () => {},
  newRouteList = [],
}: Props) => {
  const { options } = GetOptions({ newRouteList });
  const schema = Validation();
  const { control, handleSubmit, reset, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const { createRoute, isLoading } = CreateFunction({ handleClose, reset });

  const onSubmit = (data: any) => {
    const obj = newRouteList.find((item: any) => item.path === data.name);
    console.log("obj", obj);

    createRoute(obj);
  };

  return (
    <CModal
      title="Добавьте новую страницу"
      open={true}
      handleClose={() => handleClose()}
      footerActive={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HFSelect
          name="name"
          options={options}
          control={control}
          handleClick={(val) => setValue("title", val.title)}
          placeholder="Название страницы"
        />

        <div className="mt-5">
          {isLoading ? (
            <div className="custom-btn disabled form">
              <CircularProgress size={30} />
              Загрузка
            </div>
          ) : (
            <button type="submit" className="custom-btn form">
              Подверждад
            </button>
          )}
        </div>
      </form>
    </CModal>
  );
};
