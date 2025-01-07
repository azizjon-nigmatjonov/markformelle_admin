import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
import usePageRouter from "../../../hooks/useObjectRouter";

export const RollLogic = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [userInfo, setUserInfo]: any = useState({});
  const { navigateTo } = usePageRouter();
  const Logout = () => {
    dispatch(authActions.logout());
    setTimeout(() => {
      navigateTo("/");
      sessionStorage.removeItem("has_route");
      window.location.reload();
    }, 500);
  };
  useEffect(() => {
    if (!user?.password) return;
    const userData = JSON.stringify({
      password: user?.password,
      email: user?.email,
    });
    axios
      .get(`http://192.168.181.29:3000/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          user: userData,
        },
      })
      .then((res) => {
        dispatch(authActions.login({ access_token: res.data.email }));
        dispatch(authActions.setUser(res.data));
        setUserInfo(res.data);
      })
      .catch((err) => {
        if (err.status === 404) {
          Logout();
        }
      });
  }, []);

  useEffect(() => {
    if (userInfo?.roles?.length) {
      axios
        .get("http://192.168.181.29:3000/user-rolls", {
          params: {
            rolls: JSON.stringify(userInfo.roles),
          },
        })
        .then((res: any) => {
          dispatch(authActions.setRolls(res?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo?.roles]);

  return <></>;
};
