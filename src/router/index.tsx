import { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { websiteActions } from "../store/website/index";
import MainLayout from "../layouts/MainLayout";
import { routeList } from "./List";
import ErrorBoundary from "../utils/ErrorBoundary";
import { PageFallbackInner } from "../components/UI/PageFallback";
import { routeParents } from "../constants/routeParents";

const defaults = { ...routeParents };

interface Path {
  parent: string;
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

// interface routeType {
//   sidebar: boolean;
//   value: string;
// }

const Router = () => {
  const dispatch = useDispatch();
  // const link = useSelector((state: any) => state.auth.token);
  const [list, setList] = useState<string[]>([]);
  const [listNew, setListNew] = useState<string[]>([]);
  // const storedRoutes = useSelector((state: any) => state.website.routes);

  const [routes, setRoutes]: any = useState({ ...defaults });
  const [newRoutes, setNewRoutes] = useState({ ...defaults });

  const getPath = ({
    parent = "",
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
    const obj = {
      path: path,
      sidebar,
      id: path,
      title,
      icon,
      permissions: custom_permissions,
      parent,
      link,
      parent_icon,
      single_page,
      auth,
      children,
    };

    if (!listNew.includes(obj.id)) {
      setNewRoutes((prev: any) => ({
        ...prev,
        [parent]: [...prev[parent], obj],
      }));
      setListNew((prev) => [...prev, obj.id]);
    }

    if (!list.includes(obj.id)) {
      setRoutes((prev: any) => ({
        ...prev,
        [parent]: [...prev[parent], obj],
      }));
      setList((prev) => [...prev, obj.id]);
    }
    return path;
  };

  // const navigator = useMemo(() => {
  //   for (const key in storedRoutes) {
  //     if (storedRoutes[key]?.length) {
  //       if (storedRoutes[key].find((item: routeType) => item.sidebar)) {
  //         return storedRoutes[key].find((item: routeType) => item.sidebar)
  //           ?.path;
  //       }
  //     }
  //   }
  // }, [storedRoutes]);

  useEffect(() => {
    dispatch(websiteActions.setRoutes({ ...routes }));
    dispatch(websiteActions.setNewRoutes({ ...newRoutes }));
  }, []);

  // if (!!link) {
  //   return (
  //     <Suspense fallback={"Loading..."}>
  //       <Routes>
  //         <Route path="/" element={<AuthLayout />}>
  //           <Route index element={<Navigate to="/login" />} />
  //           <Route path="/login" element={<Login />} />
  //           <Route path="registration" element={<Registration />} />
  //           <Route path="*" element={<Navigate to="/login" />} />
  //         </Route>
  //         <Route path="*" element={<Navigate to="/login" />} />
  //       </Routes>
  //     </Suspense>
  //   );
  // }

  return (
    <Suspense fallback={<PageFallbackInner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routeList?.map((route: any, index) => (
            <Route
              path={getPath({
                parent: route.parent,
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
              element={
                <ErrorBoundary>
                  <Suspense fallback={<PageFallbackInner />}>
                    {route.element}
                  </Suspense>
                </ErrorBoundary>
              }
            />
          ))}

          <Route
            index
            element={<Navigate to={"/kniting/knitting_machines"} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/kniting/knitting_machines" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
