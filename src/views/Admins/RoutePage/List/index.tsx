// import { useSelector } from "react-redux";
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
        <img
          className="w-[200px]"
          src="/images/no-data.png"
          alt="no data"
          loading="lazy"
        />
      </div>
    );
  }

  const { deletePermission, deleteRoute } = DeleteFunction({ handleClose });

  return (
    <div className="mt-10">
      {newRouteList?.map((route: any, index: number) => (
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
