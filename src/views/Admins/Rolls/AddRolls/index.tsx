import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../../components/UI/Header";
import Rolls from "./Rolls";
import { useForm } from "react-hook-form";
import { CreateFunction, FetchFunction, GetRoutes, breadCrumbs } from "./Logic";
import { useParams } from "react-router-dom";
import { RollList } from "./List";
import { RollForm } from "./Form";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CTable from "../../../../components/CElements/CTable";
import CCard from "../../../../components/CElements/CCard";
import CCheckbox from "../../../../components/CElements/CCheckbox";

const NewRolls = () => {
  const { id } = useParams();
  const [filterParams, setFilterParams] = useState({});

  const { allRoutes, handleCheckBox } = GetRoutes();

  const {
    newRouteList,
    isLoading: listLoading,
    rollData,
  } = FetchFunction({ id });

  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });

  const { createRoll, updateRoll, isLoading } = CreateFunction({});
  const { breadCrumbsItems } = breadCrumbs({ id });
  const [permissions, setPermissions]: any = useState({});

  const onSubmit = (data: any) => {
    data.id = data.name.split(" ").join("").toLowerCase();
    if (id !== ":create") {
      updateRoll(data, id);
    } else {
      createRoll(data);
    }
    setValue("name", "");
  };

  const handleCheck = (permission: any, type?: string) => {
    let obj = { ...permissions };

    if (type === "all") {
      const ids = permission?.map((item: any) => item.label);
      const key = permission[0]?.id;

      if (key in obj) {
        if (obj[key].length >= ids.length) {
          obj[key] = [];
        } else {
          obj[key] = ids;
        }
      } else {
        obj[key] = ids;
      }
    } else {
      const value = permission.label;
      const key = permission.value.substring(0, permission.value.indexOf("#"));

      if (key in obj) {
        if (obj[key].includes(value)) {
          obj[key] = obj[key].filter((item: string) => item !== value);
        } else {
          obj[key].push(value);
        }
      } else {
        obj[key] = [];
        obj[key].push(value);
      }
    }

    setValue("permissions", obj);
    setPermissions(obj);
  };

  useEffect(() => {
    if (rollData?.permissions) {
      setPermissions(rollData.permissions);
      setValue("permissions", rollData.permissions);
    }
  }, [rollData]);

  const headColumns: any = [
    {
      title: "Stranitsa",
      id: "title",
    },
    {
      title: "view_page",
      id: "view_page",
      render: (obj: any) => {
        return (
          <div className="w-full flex justify-center">
            <div>
              <CCheckbox
                element={{ value: obj?.value, id: obj?.id }}
                checked={obj?.checked}
                disabled={!obj?.value}
                handleCheck={(obj: any) => handleCheckBox(obj)}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "view_single_page",
      id: "view_single_page",
      render: (obj: any) => {
        if (!obj?.label) return <></>;
        return (
          <div className="w-full flex justify-center">
            <div>
              <CCheckbox />
            </div>
          </div>
        );
      },
    },
    {
      title: "add",
      id: "add",
      render: (obj: any) => {
        if (!obj?.label) return <></>;
        return (
          <div className="w-full flex justify-center">
            <div>
              <CCheckbox />
            </div>
          </div>
        );
      },
    },
    {
      title: "edit",
      id: "edit",
      render: (obj: any) => {
        if (!obj?.label) return <></>;
        return (
          <div className="w-full flex justify-center">
            <div>
              <CCheckbox />
            </div>
          </div>
        );
      },
    },
  ];

  const handleActions = () => {};

  return (
    <>
      <Header
        sticky={true}
        extra={
          <CBreadcrumbs items={breadCrumbsItems} progmatic={true} type="link" />
        }
      ></Header>

      <div className="p-2">
        <CCard classes="p-0">
          <div className="w-[80%]">
            <Rolls text="Новый рол">
              <RollForm
                id={id}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                control={control}
                setValue={setValue}
                rollData={rollData}
                isLoading={isLoading}
              />
            </Rolls>
          </div>
          <CTable
            headColumns={headColumns}
            bodyColumns={allRoutes}
            isResizeble={true}
            handleActions={handleActions}
            isLoading={isLoading}
            filterParams={filterParams}
            handleFilterParams={() => {}}
            disablePagination={true}
            tableSetting={false}
            removeSearch={true}
          />
        </CCard>
      </div>
    </>
  );
};

export default NewRolls;
