import {
  EnglishFlag,
  RussionFlag,
  TurkishFlag,
  UzbekFlag,
} from "../../components/UI/IconGenerator/Svg/Machines";

export const useLangs = () => {
  const langList = [
    {
      label: (
        <div className="flex space-x-2">
          <RussionFlag /> <span>Русский</span>
        </div>
      ),
      value: "ru",
    },
    {
      label: (
        <div className="flex space-x-2">
          <UzbekFlag /> <span>Узбекский</span>
        </div>
      ),
      value: "uz",
    },
    {
      label: (
        <div className="flex space-x-2">
          <TurkishFlag /> <span>Turkish</span>
        </div>
      ),
      value: "tu",
    },
    {
      label: (
        <div className="flex space-x-2">
          <EnglishFlag /> <span>English</span>
        </div>
      ),
      value: "en",
    },
  ];
  return { langList };
};
