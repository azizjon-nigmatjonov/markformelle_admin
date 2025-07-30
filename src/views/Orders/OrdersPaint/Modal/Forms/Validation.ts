import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    HAMID: yup.string().required("Обязательное поле!"),
    RENKDERINLIGIID: yup.number().required("Обязательное поле!"),
    ISLEMTIPIID: yup.number().required("Обязательное поле!"),
  });
};
