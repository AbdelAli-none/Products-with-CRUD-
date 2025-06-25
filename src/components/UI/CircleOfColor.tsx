import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleOfColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={`w-6 h-6 rounded-full cursor-pointer block`}
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};

export default CircleOfColor;


// [red, blue, yellow, orange]
// yellow
// array.filter(item => item !== yellow)
// [red, blue, orange]