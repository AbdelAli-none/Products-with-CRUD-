interface IProps {
  imageURL: string;
  alt: string;
  className: string;
}

const ProductImage = ({ imageURL, className, alt }: IProps) => {
  return <img src={imageURL} alt={alt} className={className}/>;
};

export default ProductImage;
