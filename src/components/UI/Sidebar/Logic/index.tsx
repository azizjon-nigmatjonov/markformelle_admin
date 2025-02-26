import { useSelector } from "react-redux";

export const getWebsiteData = () => {
  const userInfo = useSelector((state: any) => state.auth.user);
  const routes = useSelector((state: any) => state.website.routes);

  return { userInfo: userInfo ?? {}, routes: routes ?? [] };
};
