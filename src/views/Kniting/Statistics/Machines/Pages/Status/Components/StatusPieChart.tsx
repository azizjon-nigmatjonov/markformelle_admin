import { ResponsivePie } from "@nivo/pie";
interface Props {
  list: any;
}

export const StatusPieChart = ({ list = [] }: Props) => {
  const CustomTooltip = ({ datum }: { datum: any }) => {
    return (
      <div className="flex flex-col bg-white border border-[var(--border)] rounded-[8px] shadow-lg p-4">
        <ul>
          <li className="flex">
            <strong>{datum.label}</strong>: {datum.value}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <ResponsivePie
      data={list}
      innerRadius={0.4}
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
  );
};
