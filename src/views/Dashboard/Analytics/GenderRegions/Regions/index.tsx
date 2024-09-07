import { ResponsivePie } from "@nivo/pie";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";

interface Props {
  name: string;
  male_users: number;
  female_users: number;
  all: number;
  data: { value: number; label: string }[];
}

const RegionsPie = ({
  data = [],
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const Label = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    fontSize: 12,
    fontWeight: 600,
    color: "var(--black)",
  }));

  const responsiveData = [
    {
      id: "success",
      label: "Success",
      value: 55,
    },
    {
      id: "primary",
      label: "Primary",
      value: 20,
    },
    {
      id: "gray",
      label: "Gray",
      value: 15,
    },
    {
      id: "error",
      label: "Error",
      value: 10,
    },
  ];

  const CustomTooltip = ({ datum }: { datum: any }) => {
    return (
      <div
        style={{
          padding: "8px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <strong>{datum.label}</strong>: {datum.value}
      </div>
    );
  };

  return (
    <div className={`grid grid-cols-11 py-8 gap-5`}>
      {loading
        ? Array.from(new Array(20))?.map((_) => (
            <Skeleton variant="circular" width={120} height={120} />
          ))
        : data?.map(({ name }: Props) => (
            <div
              key={name}
              className="border border-[var(--border)] rounded-[8px]"
            >
              <Label className="px-3">{name ?? "Noma'lum viloyat"}</Label>
              <div className="w-full h-[130px] p-3 flex items-center mt-3">
                <ResponsivePie
                  data={responsiveData}
                  innerRadius={0.5}
                  activeOuterRadiusOffset={2}
                  enableArcLinkLabels={false}
                  isInteractive={true}
                  enableArcLabels={false}
                  colors={[
                    "var(--success)",
                    "var(--primary70)",
                    "var(--gray)",
                    "var(--error)",
                  ]}
                  tooltip={({ datum }) => <CustomTooltip datum={datum} />}
                />
              </div>
            </div>
          ))}
    </div>
  );
};

export default RegionsPie;
