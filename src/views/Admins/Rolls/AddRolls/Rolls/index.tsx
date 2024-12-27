interface Props {
  text: string;
  children?: any;
}

const Rolls = ({ text, children }: Props) => {
  return (
    <div className="flex items-start gap-8 pb-6 pt-2">
      <p className="text-xl font-medium w-[280px]">{text}</p>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Rolls;
