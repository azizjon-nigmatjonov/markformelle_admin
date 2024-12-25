import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";

export const RollLogic = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.auth.user);

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
  }, [userInfo]);

  return <></>;
};
