import { Paper } from "@mui/material";
import "./style.scss";
import TableLoader from "./TableLoader";
import { OneSkeleton } from "../../CSkeleton/OneSkeleton";

interface Props {
  loader: boolean;
  height: any;
  count: number;
  totalCount?: number;
  currentLimit: number;
  passRouter: boolean;
  filterParams: any;
  tableStyle?: object;
  wrapperStyle?: object;
  children: any;
  disablePagination?: any;
  dataLength: number;
}

export const CTableWrapper = ({
  loader,
  height,
  tableStyle = {},
  wrapperStyle = {},
  children,
}: Props) => {
  if (loader) return <OneSkeleton height={window?.innerHeight} />;
  return (
    <Paper className="CTableContainer" style={wrapperStyle}>
      <div
        className="table"
        style={{
          height: height ? height : "auto",
          overflow: loader ? "hidden" : "auto",
          ...tableStyle,
        }}
      >
        <table id="resizeMe">{children}</table>
      </div>
    </Paper>
  );
};

export const CTableHead = ({ children }: { children: any }) => {
  return <thead className="CTableHead">{children}</thead>;
};

export const CTableHeadRow = ({ children }: { children: any }) => {
  return <tr className="CTableHeadRow">{children}</tr>;
};

export const CTableHeadCell = ({
  children,
  className = "",
  buttonsCell = false,
  ...props
}: {
  children: any;
  className?: string;
  buttonsCell?: any;
  id: any;
  style: any;
}) => {
  return (
    <th {...props} className="sticky">
      {children}
    </th>
  );
};

export const CTableBody = ({
  children,
  rowsCount,
  loader,
  ref,
  dataLength,
  ...props
}: {
  children: any;
  rowsCount: number;
  loader: boolean;
  ref?: any;
  dataLength: any;
  columnscount?: any;
}) => {
  return (
    <>
      <TableLoader isVisible={loader} rowsCount={rowsCount} />

      <tbody className="CTableBody w-full" {...props} ref={ref}>
        {children}
      </tbody>
    </>
  );
};

export const CTableRow = ({
  children,
  classes = "",
  ...props
}: {
  children: any;
  classes?: string;
}) => {
  return (
    <tr className={`CTableRow ${classes}`} {...props}>
      {children}
    </tr>
  );
};

export const CTableCell = ({
  children,
  className = "",
  buttonsCell = false,
  ...props
}: {
  children: any;
  className: string;
  buttonsCell?: boolean;
  onClick?: (val: any) => void;
  style?: any;
}) => {
  return (
    <td
      className={`CTableCell ${className} ${buttonsCell ? "buttonsCell" : ""}`}
      {...props}
    >
      {children}
    </td>
  );
};
