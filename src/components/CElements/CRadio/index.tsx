export const CRadio = ({
  onChange,
  label = "",
  checked = false,
  value = "",
  name = "",
}: {
  onChange: (e: any) => void;
  label: string;
  checked: boolean;
  value: string;
  name: string;
}) => {
  return (
    <div className="w-full">
      <label
        className="flex items-center space-x-2 w-full border border-[var(--border)] rounded-[8px] px-2 py-1 cursor-pointer focus-within:border-[var(--primary)] outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange({ target: { value } });
          }
        }}
      >
        <input
          checked={checked}
          className="focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1"
          type="radio"
          value={value}
          name={name}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
