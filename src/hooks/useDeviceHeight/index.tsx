interface Props {
  type: string;
  count?: number;
  minus?: number;
  percent?: number;
}

const useDeviceHeight = () => {
  const height = window?.screen?.height;

  const getHeight: any = ({ type = "", count = 0, minus = 0 }: Props) => {
    switch (type) {
      case "machine":
        return height < 600
          ? height / (count - count / 4) - minus
          : height / count - minus;
      case "card":
        return height < 600 ? height / (count - count / 3) : height / count;
      default:
        return 40;
    }
  };

  const getFontSize: any = ({ type = "", count = 0, percent = 0 }: Props) => {
    switch (type) {
      case "machine":
        return height > 1200
          ? (percent / 100) * (height / count / 1.7)
          : height < 600
          ? (percent / 100) * (height / (count - count / 3.3))
          : height < 740
          ? (percent / 100) * (height / count - 15)
          : (percent / 100) * (height / count);
      case "card":
        return height < 600
          ? (percent / 100) * (height / (count - count / 4))
          : (percent / 100) * (height / count);
      default:
        return 40;
    }
  };

  return { getHeight, getFontSize };
};

export default useDeviceHeight;
