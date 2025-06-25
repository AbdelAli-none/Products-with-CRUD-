interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  return (
    <span className="text-red-500 font-normal text-[14px] block mt-1">
      {msg}
    </span>
  );
};

export default ErrorMsg;
