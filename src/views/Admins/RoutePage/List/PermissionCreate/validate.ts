import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    permissions: yup
      .array()
      .of(yup.string())
      .required("Обязательное поле!")
      .test(
        "is-permissions-empty",
        "Permission kiritilmagan",
        (value) => value && value.length > 0
      ),
  });
};
