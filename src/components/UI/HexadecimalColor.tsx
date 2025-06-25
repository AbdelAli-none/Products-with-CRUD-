interface IProps {
  color: string;
}

const HexadecimalColor = ({ color }: IProps) => {
  return (
    <span className="text-sm rounded-lg px-2 py-1 text-white" style={{ backgroundColor: color }}>
      {color.toUpperCase()}
    </span>
  );
};

export default HexadecimalColor;
