import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button
      className={`p-2 font-bold text-white text-sm duration-300 cursor-pointer rounded-lg my-3 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
