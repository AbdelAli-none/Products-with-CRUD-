import type { IDefaultErrorsObject, IProduct } from "../interfaces";
import { addCommas, shorten } from "../utils/functions";
import ProductImage from "./ProductImage";
import Button from "./UI/Button";
import CircleOfColor from "./UI/CircleOfColor";

interface IProps {
  product: IProduct;
  openEditModal: () => void;
  setProductToEdit: (product: IProduct) => void;
  setProductToEditIdx: (idx: number) => void;
  idx: number;
  openConfirmModal: () => void;
  setErrors: (errorObj: IDefaultErrorsObject) => void;
}

const defaultProductErrors = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  tempColors: "",
};

const ProductCard = ({
  product,
  openEditModal,
  setProductToEdit,
  setProductToEditIdx,
  idx,
  openConfirmModal,
  setErrors,
}: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;

  const renderCirclesOfColor = colors.map((color, idx) => {
    return <CircleOfColor color={color} key={idx} />;
  });

  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
    setErrors(defaultProductErrors);
  };

  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="max-w-sm md:max-w-lg w-full mx-auto flex flex-col justify-between rounded-lg p-2 border-2 border-blue-400">
      <ProductImage
        imageURL={imageURL}
        alt={title}
        className="rounded-lg border-3 w-full sm:h-[200px] border-gray-100"
      />
      <h3 className="my-3 text-blue-700 font-medium">{title}</h3>
      <p className="text-gray-400 min-h-20">{shorten(description)}</p>
      <div className="flex flex-wrap space-x-1 space-y-1 my-3">
        {renderCirclesOfColor.length
          ? renderCirclesOfColor
          : "No Available Colors!"}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-blue-400 font-bold">${addCommas(price)}</span>
        <div className="flex items-center">
          <span className="me-3">{category.name}</span>
          <ProductImage
            imageURL={category.imageURL}
            alt={title}
            className="w-10 h-10 rounded-full outline-3 border-3 border-transparent outline-blue-400"
          />
        </div>
      </div>
      <div className="flex justify-between mt-3 space-x-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 rounded-lg flex-1"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 rounded-lg flex-1"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
