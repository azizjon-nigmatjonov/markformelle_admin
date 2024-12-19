import { useSelector } from "react-redux";
import { ListSkeleton } from "../../../../components/CElements/CSkeleton/ListSkeleton";
import { ListIem } from "./ListItem";
import { DeleteFunction } from "./Logic";

const testData = [
  {
    path: "knitting/machines",
    sidebar: true,
    id: "knitting/machines",
    title: "knittingavto",
    icon: {
      type: "img",
      key: null,
      ref: null,
      props: {
        width: 18,
        src: "/images/kniting.png",
        alt: "knitting",
      },
      _owner: null,
      _store: {},
    },
    permissions: [],
    parent: "knitting",
    link: "machines",
    parent_icon: {
      type: "img",
      key: null,
      ref: null,
      props: {
        width: 18,
        src: "/images/kniting.png",
        alt: "knitting",
      },
      _owner: null,
      _store: {},
    },
    single_page: false,
    auth: false,
    children: [],
  },
];

interface Props {
  newRouteList: any;
  isLoading: boolean;
  handleClose: () => void;
}

export const RouteList = ({
  newRouteList = [],
  isLoading = true,
  handleClose,
}: Props) => {
  if (isLoading) {
    return (
      <div className="mt-10">
        <ListSkeleton direction="row" count={7} height={102} />
      </div>
    );
  }

  if (!testData?.length) {
    return (
      <div className="w-full flex justify-center mt-10">
        <img className="w-[200px]" src="/images/no-data.png" alt="no data" />
      </div>
    );
  }

  const { deletePermission, deleteRoute } = DeleteFunction({ handleClose });
  const test_routes =
    useSelector((state: any) => state.table.test_routes) ?? [];

  return (
    <div className="mt-10">
      {test_routes?.map((route: any, index: number) => (
        <ListIem
          key={index}
          handleClose={handleClose}
          deleteRoute={deleteRoute}
          deletePermission={deletePermission}
          route={route ?? {}}
        />
      ))}
    </div>
  );
};
