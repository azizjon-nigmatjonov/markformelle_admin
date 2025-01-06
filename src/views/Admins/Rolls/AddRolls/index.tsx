import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../../components/UI/Header";
import Rolls from "./Rolls";
import { useForm } from "react-hook-form";
import { CreateFunction, FetchFunction, breadCrumbs } from "./Logic";
import { useParams } from "react-router-dom";
import { RollForm } from "./Form";
import { useEffect, useMemo, useState } from "react";
import CTable from "../../../../components/CElements/CTable";
import CCard from "../../../../components/CElements/CCard";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./validate";
import { useSelector } from "react-redux";
import { StaticPermissions } from "../../../../constants/permissions";
import _ from "lodash";

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
  const { createRoll, updateRoll, isLoading } = CreateFunction({});
  const { breadCrumbsItems } = breadCrumbs({ id });

  const newRoutes = useSelector((state: any) => state.website.new_routes);
  const [allRoutes, setAllRoutes]: any = useState([]);

  useEffect(() => {
    setAllRoutes([]);
    const arr: any = [];
    if (rollData?.id) {
      for (const key in newRoutes) {
        newRoutes[key].forEach((item: any) => {
          const obj = { ...item };
          const foundRoute = rollData.routes?.find(
            (route: any) => route.id === item.id
          );

          obj.permissions.forEach((el: any) => {
            const permission: any = foundRoute?.permissions?.[el];

            obj[el] = permission
              ? permission
              : {
                  checked: false,
                  id: item.id,
                  value: el,
                };
          });

          arr.push(obj);
        });
      }
    } else {
      for (const key in newRoutes) {
        newRoutes[key].forEach((item: any) => {
          const obj = { ...item };

          obj.permissions.forEach((el: any) => {
            const permission: any =
              StaticPermissions.find((item: any) => item.value === el) ?? {};
            permission.checked = false;
            permission.id = item.id;
            obj[el] = permission;
          });

          arr.push(obj);
        });
      }
    }

    setAllRoutes(arr);
  }, [rollData?.id, newRoutes]);

  const handleCheckBox = (obj: any) => {
    setAllRoutes([]);

    const newArr: any = [];
    allRoutes.forEach((item: any) => {
      const newObj = _.cloneDeep(item);

      if (newObj.path === obj.id) {
        newObj[obj.value] = {
          ...obj,
          id: obj.id,
          checked: !obj.checked,
        };
        if (newObj.newPermissions) {
          newObj.newPermissions = {
            ...newObj.newPermissions,
            [`${obj.value}`]: {
              ...obj,
              id: obj.id,
              checked: !obj.checked,
            },
          };
        } else {
          newObj.newPermissions = {
            [obj.value]: {
              ...obj,
              id: obj.id,
              checked: !obj.checked,
            },
          };
        }
      }

      newArr.push(newObj);
    });

    setAllRoutes(newArr);
  };

  const onSubmit = (data: any) => {
    const params = { ...data };
    params.id = data.name.split(" ").join("").toLowerCase();
    let countFeatures = 0;
    const routeAndPermissions = allRoutes.map((item: any) => {
      const permissions: any = {};

      for (let obj of StaticPermissions) {
        const newObj: any = obj;

        if (newObj.value in item) {
          permissions[newObj.value] = item[newObj.value];
          if (permissions[newObj?.value]?.checked) {
            countFeatures += 1;
          }
        }
      }

      return {
        permissions: permissions,
        id: item.id,
      };
    });

    params.routes = routeAndPermissions;
    params.countFeatures = countFeatures;

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
        title: "Страница",
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
