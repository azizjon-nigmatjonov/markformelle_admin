import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    name: yup.string().required("Обязательное поле!"),
    email: yup.string().required("Majburiy maydon").email("enter_valid_email"),
    roles: yup
      .array()
      .of(yup.string())
      .required("Обязательное поле!")
      .test(
        "is-permissions-empty",
        "Permission kiritilmagan",
        (value) => value && value.length > 0
      ),
    phone: yup
      .string()
      .matches(
        /^(\+998)\s(9[0-9])\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/,
        "enter_valid_phone_number"
      )
      .required("enter_phone_number"),

    password: yup.string().required("Обязательное поле!"),
  });
};

export const UpdateValidation = () => {
  return yup.object().shape({
    name: yup.string().required("Majburiy maydon"),
    email: yup
      .string()
      .required("Majburiy maydon")
      .email("Tog'ri email kiriting!"),
    roles: yup
      .array()
      .of(yup.string())
      .required("Обязательное поле!")
      .test(
        "is-permissions-empty",
        "Выберите роль!",
        (value) => value && value.length > 0
      ),
    phone: yup.string().required("enter_phone_number"),
  });
};
