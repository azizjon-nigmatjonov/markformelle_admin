interface Props {
  type: string;
  count?: number;
  percent?: number;
}

const useDeviceHeight = () => {
  const height = window.screen.height;

  const getHeight = ({ type = "", count = 0 }: Props) => {
    switch (type) {
      case "card":
        return height < 600 ? height / (count - count / 3) : height / count;
      default:
        return "40px";
    }
  };

  const getFontSize = ({ type = "", count = 0, percent = 0 }: Props) => {
    switch (type) {
      case "card":
        return height < 600
          ? (percent / 100) * (height / (count - count / 4))
          : (percent / 100) * (height / count);
      default:
        return "40px";
    }
  };

  return { getHeight, getFontSize };
};

export default useDeviceHeight;
