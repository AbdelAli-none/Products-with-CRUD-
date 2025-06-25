import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      autoComplete="given-name"
      className="w-full tracking-wide rounded-lg shadow-md border-2 border-transparent duration-100 bg-white px-2 py-1.5 font-normal text-gray-400 text-md focus:outline-none focus:border-2 focus:border-blue-600"
      {...rest}
    />
  );
};

export default Input;
