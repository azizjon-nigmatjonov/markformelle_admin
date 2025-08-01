import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { websiteActions } from "../store/website/index";
import MainLayout from "../layouts/MainLayout";
import { routeList } from "./List";
import ErrorBoundary from "../utils/ErrorBoundary";
import { routeParents } from "../constants/routeParents";
const defaults = { ...routeParents };

interface Path {
  parent: string;
  parent_link?: string;
  link: string;
  childLink?: string;
  title: string;
  icon: string;
  sidebar: boolean;
  custom_permissions: any;
  single_page: boolean;
  parent_icon: string;
  auth: boolean;
  children?: any;
}

const Router = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState<string[]>([]);
  const [listNew, setListNew] = useState<string[]>([]);
  const userInfo = useSelector((state: any) => state.auth.user);
  const userRolls = useSelector((state: any) => state.auth.rolls);
  const [routes, setRoutes]: any = useState({ ...defaults });
  const [newRoutes, setNewRoutes] = useState({ ...defaults });

  const Permissions = useMemo(() => {
    if (!userRolls?.length) return [];
    let permissions: any = [];
    userRolls?.forEach((el: any) => {
      const arr = el.routes;

      for (let obj of arr) {
        permissions.push(obj);
      }
    });

    return permissions;
  }, [userRolls]);

  const getPath = ({
    parent = "",
    parent_link = "",
    link,
    childLink,
    title,
    icon,
    sidebar,
    custom_permissions,
    single_page,
    parent_icon,
    auth,
    children,
  }: Path) => {
    const path = `${parent}/${link}${childLink ? `/${childLink}` : ""}`;

    const serializableObj = {
      path: path,
      sidebar,
      id: path,
      title,
      icon: typeof icon === "string" ? icon : "",
      permissions: custom_permissions,
      parent,
      link,
      parent_icon: typeof parent_icon === "string" ? parent_icon : "",
      single_page,
      auth,
      children: children?.map((child: any) => ({
        ...child,
        icon: typeof child.icon === "string" ? child.icon : "",
        parent_icon:
          typeof child.parent_icon === "string" ? child.parent_icon : "",
      })),
      parent_link,
    };

    const found = Permissions?.find((item: any) => item.id === path);

    if (!listNew.includes(serializableObj.id)) {
      setNewRoutes((prev: any) => ({
        ...prev,
        [parent]: [...prev[parent], serializableObj],
      }));
      setListNew((prev) => [...prev, serializableObj.id]);
    }

    if (
      found?.permissions?.view_page?.checked ||
      !auth ||
      userInfo?.roles?.includes("superadmin") ||
      1
    ) {
      if (!list.includes(serializableObj.id)) {
        setRoutes((prev: any) => ({
          ...prev,
          [parent]: [...prev[parent], serializableObj],
        }));
        setList((prev) => [...prev, serializableObj.id]);
      }
      return path;
    }

    return "";
  };

  useEffect(() => {
    dispatch(websiteActions.setRoutes({ ...routes }));
    dispatch(websiteActions.setNewRoutes({ ...newRoutes }));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routeList?.map((route: any, index) => (
          <Route
            path={getPath({
              parent: route.parent,
              parent_link: route.parent_link,
              link: route.link,
              sidebar: route.sidebar,
              title: route.title,
              icon: route.icon,
              custom_permissions: route?.permissions ?? [],
              single_page: route?.single_page ?? false,
              parent_icon: route?.parent_icon ?? "",
              auth: route?.auth ?? false,
              childLink: route?.childLink ?? "",
              children: route?.children ?? [],
            })}
            key={index}
            element={<ErrorBoundary>{route.element}</ErrorBoundary>}
          />
        ))}

        <Route index element={<Navigate to={"/knitting/machines"} />} />
      </Route>
      <Route path="*" element={<Navigate to="/knitting/machines" />} />
    </Routes>
  );
};

export default Router;
