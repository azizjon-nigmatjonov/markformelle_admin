import usePageRouter from "../../../../hooks/useObjectRouter";
import CModal from "../../../../components/CElements/CModal";

import { FetchFunction } from "./Logic";
import { AdminFormWrapper } from "./Form";
const Form = ({ refetch, id }: { refetch: () => void; id: string }) => {
  const { navigateQuery } = usePageRouter();

  const { rolls, defaultValues } = FetchFunction({
    userId: id,
  });
  console.log("defaultValues", defaultValues);

  return (
    <CModal
      title={id ? "edit" : "add"}
      open={true}
      handleClose={() => navigateQuery({ id: "" })}
      footerActive={false}
    >
      <AdminFormWrapper
        rolls={rolls}
        defaultValues={defaultValues}
        refetch={refetch}
        id={id}
      />
    </CModal>
  );
};

export default Form;
