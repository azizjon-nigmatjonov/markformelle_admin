import useCQuery from "../../../../hooks/useCQuery";

export const breadCrumbItems = [
  { label: "dashboard", link: "/dashboard/dashboard" },
  { label: "dashboard_analytics_plans", link: "/dashboard/dashboard" },
];

export const TableData = () => {
  const headColumns = [
    {
      title: "#",
      id: "id",
    },
    {
      title: "yo'lovchi",
      id: "pasenger",
    },
    {
      title: "haydovchi",
      id: "driver",
    },
    {
      title: "so'ralgan sana",
      id: "riderequest_in_datetime",
    },
    {
      title: "holat",
      id: "status",
    },
  ];

  return { headColumns };
};

export const FetchFunction = () => {
  const { data, isLoading } = useCQuery({
    key: `GET_DRIVER_HOME`,
    endpoint: `/WEB_ALL?code=01&podr_id=614`,
    params: {
      // page: 1,
    },
  });
  
  return { bodyData: data ?? [], isLoading };
};
