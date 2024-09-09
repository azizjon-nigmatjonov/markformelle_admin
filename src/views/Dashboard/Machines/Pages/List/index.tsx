import CTable from "../../../../../components/CElements/CTable";

export const MachineList = () => {
  return (
    <>
      <CTable
        headColumns={[]}
        bodyColumns={[]}
        // meta={bodyColumns?.meta}
        isResizeble={true}
        isLoading={false}
        handleActions={() => {}}
        filterParams={{}}
        handleFilterParams={() => {}}
      />
    </>
  );
};
