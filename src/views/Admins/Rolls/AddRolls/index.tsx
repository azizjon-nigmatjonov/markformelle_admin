import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../../components/UI/Header";
import Rolls from "./Rolls";
import { useForm } from "react-hook-form";
import { CreateFunction, FetchFunction, GetRoutes, breadCrumbs } from "./Logic";
import { useParams } from "react-router-dom";
import { RollForm } from "./Form";
import { useMemo, useState } from "react";
import CTable from "../../../../components/CElements/CTable";
import CCard from "../../../../components/CElements/CCard";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./validate";

const NewRolls = () => {
  const schema = Validation();
  const { t } = useTranslation();
  const { id } = useParams();
  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [filterParams, setFilterParams] = useState({});
  const { rollData } = FetchFunction({ id });
  const { allRoutes, handleCheckBox } = GetRoutes({ rollData });
  const { createRoll, updateRoll, isLoading } = CreateFunction({});
  const { breadCrumbsItems } = breadCrumbs({ id });

  const onSubmit = (data: any) => {
    const params = { ...data };
    params.id = data.name.split(" ").join("").toLowerCase();

    const routeAndPermissions = allRoutes.map((item: any) => {
      return {
        permissions: item.newPermissions,
        id: item.id,
      };
    });
    params.routes = routeAndPermissions;
    if (id !== ":create") {
      updateRoll(params, id);
    } else {
      createRoll(params);
    }
    setValue("name", "");
  };

  const headColumns: any = useMemo(() => {
    return [
      {
        title: "Stranitsa",
        id: "title",
        width: 300,
        render: (val: string) => {
          return t(val);
        },
      },
      {
        title: "view_page",
        id: ["view_page", "id"],
        width: 230,
        render: (arr: any) => {
          const [obj, id] = arr;

          return (
            <div className="w-full flex justify-center">
              <div>
                <CCheckbox
                  element={{
                    value: obj?.value,
                    id,
                    checked: obj?.checked,
                  }}
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
        title: "add",
        id: ["add", "id"],
        width: 230,
        render: (arr: any) => {
          const [obj, id] = arr;

          return (
            <div className="w-full flex justify-center">
              <div>
                <CCheckbox
                  element={{
                    value: obj?.value,
                    id,
                    checked: obj?.checked,
                  }}
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
        title: "edit",
        id: ["edit", "id"],
        width: 230,
        render: (arr: any) => {
          const [obj, id] = arr;

          return (
            <div className="w-full flex justify-center">
              <div>
                <CCheckbox
                  element={{
                    value: obj?.value,
                    id,
                    checked: obj?.checked,
                  }}
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
        title: "delete",
        id: ["delete", "id"],
        width: 230,
        render: (arr: any) => {
          const [obj, id] = arr;

          return (
            <div className="w-full flex justify-center">
              <div>
                <CCheckbox
                  element={{
                    value: obj?.value,
                    id,
                    checked: obj?.checked,
                  }}
                  checked={obj?.checked}
                  disabled={!obj?.value}
                  handleCheck={(obj: any) => handleCheckBox(obj)}
                />
              </div>
            </div>
          );
        },
      },
    ];
  }, [allRoutes]);

  const handleActions = () => {};
  console.log(allRoutes);

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
          <div>
            <div className="sticky top-0 z-[99] bg-white">
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
              isResizeble={false}
              handleActions={handleActions}
              isLoading={isLoading}
              filterParams={filterParams}
              handleFilterParams={setFilterParams}
              disablePagination={true}
              tableSetting={false}
              removeSearch={true}
            />
          </div>
        </CCard>
      </div>
    </>
  );
};

export default NewRolls;
