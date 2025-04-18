import { ReactNode } from "react";

export const InputFieldUI = ({
  title,
  children,
  disabled = false,
}: {
  title: string;
  children: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between space-x-3 whitespace-nowrap">
      <p
        className={`text-sm ${
          disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
        }`}
      >
        {title}
      </p>
      <hr className="w-[90%] border-t-[3px] border-dotted border-[var(--border)]" />
      <div className="max-w-[50%] min-w-[50%]">{children}</div>
    </div>
  );
};
