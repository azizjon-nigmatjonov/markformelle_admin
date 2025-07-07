import { ReactNode } from "react";

export const InputFieldUI = ({
  title,
  children,
  disabled = false,
  required = false,
  topPosition = "",
}: {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  required?: boolean;
  topPosition?: string;
}) => {
  return (
    <div
      className={`flex ${
        topPosition ? topPosition : "items-center"
      } justify-between space-x-3 whitespace-nowrap`}
    >
      <div className="w-full flex space-x-3 items-center">
        <p
          className={`text-sm ${
            disabled ? "text-[var(--gray)]" : "text-[var(--gray)] relative"
          }`}
        >
          {title.substring(0, 13)}
          {title.length > 13 ? ".." : ""}
          {required && (
            <span className="text-[var(--error)] absolute top-[-1px] -right-2">
              *
            </span>
          )}
        </p>
        <hr className="w-[90%] border-t-[3px] border-dotted border-[var(--border)]" />
      </div>
      <div className="max-w-[50%] min-w-[50%]">{children}</div>
    </div>
  );
};
