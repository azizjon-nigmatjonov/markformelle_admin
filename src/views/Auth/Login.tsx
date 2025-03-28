import { useForm } from "react-hook-form";
import HFInput from "../../components/HFElements/HFInput";
import { PasswordIcon, UserIcon } from "../../components/UI/IconGenerator/Svg";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import useAuth from "../../services/auth/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authActions } from "../../store/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import usePageRouter from "../../hooks/useObjectRouter";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [password, setPassword] = useState(true);
  const { navigateTo } = usePageRouter();
  const dispatch = useDispatch();
  const [error, setError]: any = useState({});
  const link = useSelector((state: any) => state.auth.link);
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("required_field")
      .email("Tog'ri email kiriting"),
    password: yup
      .string()
      .required("required_field")
      .min(4, "Eng kamida 8 xonalik so'z kiriting"),
  });

  const { login } = useAuth({
    loginProps: {
      onSuccess: (value: any) => {
        if (value) {
          dispatch(authActions.login(value));
          navigateTo("/");
          window.location.reload();
        }
      },
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const GetUser = (user: any) => {
    axios
      .get(`http://192.168.181.29:3000/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          user: user,
        },
      })
      .then((res) => {
        dispatch(authActions.login({ access_token: res.data.email }));
        dispatch(authActions.setUser(res.data));
        if (link) {
          navigateTo(link);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        setTimeout(() => {
          dispatch(authActions.setLink(""));
        }, 500);
      })
      .catch((err) => {
        toast.error("Этот пользователь не существует!");
        console.error("Error logging in:", err);
        setError({ title: "Этот пользователь не существует!" });
      });
  };

  const onSubmit = (data: any) => {
    dispatch(authActions.login({ access_token: "111" }));
    if (link) {
      navigateTo(link);
    }
    setTimeout(() => {
      dispatch(authActions.setLink(""));
    }, 500);
    if (data?.lastname) {
      GetUser(JSON.stringify(data));
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] border border-[#E2E2EA] bg-white rounded-[14px] p-6 relative"
      >
        <h2 className="text-2xl font-[600]">Вход в систему</h2>

        <div className="mt-[18px] space-y-5">
          <HFInput
            name="email"
            register={register}
            placeholder="Электронная почта"
            classesInput="bg-[#FAFAFB] border border-[#F1F1F5]"
            errors={errors}
            icon={<UserIcon fill="var(--main)" />}
          />
          <div className="relative">
            <HFInput
              name="password"
              register={register}
              errors={errors}
              placeholder="Пароль"
              classesInput="bg-[#FAFAFB] border border-[#F1F1F5]"
              type={password ? "password" : "text"}
              icon={<PasswordIcon />}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={() => setPassword((prev) => !prev)}
            >
              {password ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>
        </div>
        {error?.title && (
          <p className="text-[var(--error)] mt-2 text-lg font-medium">
            {error.title}
          </p>
        )}
        <button
          type="submit"
          disabled={login.isLoading}
          className={`w-full mt-6 text-white flex items-center justify-center custom-btn form ${
            login.isLoading ? "disabled" : ""
          }`}
        >
          {login.isLoading && <CircularProgress size={30} />}
          <span>Отправить</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
