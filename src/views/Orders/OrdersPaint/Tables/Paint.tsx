import { PaintTablesUI } from "./PaintTablesUI";

export const PaintTable = ({
  handleActionsTable,
  formId,
  currentPaint = {},
  title,
  isLoading,
  headColumns,
  bodyColumns,
  deleteFn = () => {},
  filterParams,
  setFilterParams,
  setCurrentPaint = () => {},
  defaultFilters = [],
  height = "170px",
}: {
  title?: string;
  formId: number;
  currentPaint?: any;
  handleActionsTable: (val: any, status: string, type: string) => void;
  isLoading?: boolean;
  headColumns?: any[];
  bodyColumns?: any[];
  filterParams?: any;
  deleteFn?: (id: string[]) => void;
  setFilterParams?: (val: any) => void;
  setCurrentPaint?: (obj: any) => void;
  defaultFilters?: string[];
  height?: string;
}) => {
  return (
    <PaintTablesUI
      handleActionsTable={handleActionsTable}
      formId={formId}
      currentPaint={currentPaint}
      title={title}
      isLoading={isLoading}
      headColumns={headColumns}
      bodyColumns={bodyColumns}
      filterParams={filterParams}
      deleteFn={deleteFn}
      setCurrentPaint={setCurrentPaint}
      setFilterParams={setFilterParams}
      defaultFilters={defaultFilters}
      height={height}
    />
  );
};
