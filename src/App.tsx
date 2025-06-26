import ProductCard from "./components/ProductCard";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import Modal from "./components/UI/Modal";
import { categories, colors, formInputsList, productsList } from "./data";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IProduct } from "./interfaces";
import { v4 as uuid } from "uuid";
import { validateProduct } from "./utils/functions";
import ErrorMsg from "./components/ErrorMsg";
import CircleOfColor from "./components/UI/CircleOfColor";
import HexadecimalColor from "./components/UI/HexadecimalColor";
import Select from "./components/UI/Select";
import type { ProductInputsNames } from "./types";

function App() {
  // Default Product Object
  const defaultProductObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const defaultProductErrors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    tempColors: "",
  };

  // States of Add Product Modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // States of Edit Product Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  // States
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);
  const [products, setProducts] = useState<IProduct[]>(productsList);
  const [errors, setErrors] = useState(defaultProductErrors);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [producttoEditIdx, setProductToEditIdx] = useState<number>(0);

  // State of Select Menu - Add Product -
  const [selected, setSelected] = useState(categories[0]);

  // Handlers
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, imageURL, price } = product;

    const errors = validateProduct({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    const isError = Object.values(errors).some((error) => error !== "");

    if (isError) {
      // if there's one error don't move to the next steps
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selected,
      },
      ...prev,
    ]);

    setProduct(defaultProductObject);
    setTempColors([]);
    closeModal();
  };

  const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description, imageURL, price, colors } = productToEdit;

    const errors = validateProduct({
      title,
      description,
      imageURL,
      price,
      colors,
    });

    const isError = Object.values(errors).some((error) => error !== "");
    if (isError) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[producttoEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };

    setProducts(updatedProducts);
    setProductToEdit(defaultProductObject);
    setTempColors([]);
    closeEditModal();
  };

  const renderProductsList = products.map((product, idx) => {
    return (
      <ProductCard
        product={product}
        key={product.id}
        openEditModal={openEditModal}
        setProductToEdit={setProductToEdit}
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
      />
    );
  });

  const renderFormInputs = formInputsList.map((input, idx) => {
    return (
      <div className="mb-3" key={idx}>
        <label
          htmlFor={input.id}
          className="block tracking-wide text-sm/6 font-medium text-gray-900"
        >
          {input.label}
        </label>
        <div className="mt-2">
          <Input
            id={input.id}
            name={input.name}
            type={input.type}
            value={product[input.name]}
            onChange={onChangeHandler}
          />
          <ErrorMsg msg={errors[input.name]} />
        </div>
      </div>
    );
  });

  const renderProductColors = colors.map((color, idx) => {
    return (
      <CircleOfColor
        color={color}
        key={idx}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          setErrors({ ...errors, ["tempColors"]: "" });
          setTempColors((prev) => [...prev, color]);
        }}
      />
    );
  });

  const renderTempColors = tempColors.map((color, idx) => {
    return <HexadecimalColor color={color} key={idx} />;
  });

  const renderFormInputsEdit = (
    id: string,
    label: string,
    name: ProductInputsNames
  ) => {
    return (
      <div className="flex flex-col my-2">
        <label
          htmlFor={id}
          className="block tracking-wide text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        <Input
          type="text"
          name={name}
          id={id}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container my-6">
      <Button
        onClick={openModal}
        className="my-6 block m-auto bg-blue-600 hover:bg-blue-700"
      >
        Add Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-4 rounded-md">
        {renderProductsList}
      </div>

      {/* Add Product Modal  */}
      <Modal isOpen={isOpen} close={closeModal} title="Add A New Product">
        <form onSubmit={onSubmitHandler}>
          <div className="mt-4">{renderFormInputs}</div>
          <Select selected={selected} setSelected={setSelected} />

          <div className="flex space-x-1 mt-4">{renderProductColors}</div>

          <div>{errors.tempColors && <ErrorMsg msg={errors.tempColors} />}</div>

          <div className="flex flex-wrap items-start justify-start space-x-1 space-y-1 my-4">
            {renderTempColors}
          </div>

          <div className="flex space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 flex-1"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal  */}
      <Modal
        isOpen={isEditOpen}
        close={closeEditModal}
        title="Edit The Product"
      >
        <form onSubmit={onSubmitEditHandler}>
          <div className="mt-4">
            {renderFormInputsEdit("title", "Product Title", "title")}
            {renderFormInputsEdit(
              "description",
              "Product Description",
              "description"
            )}
            {renderFormInputsEdit("imageURL", "Product Image Link", "imageURL")}
            {renderFormInputsEdit("price", "Product Price", "price")}
          </div>
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex space-x-1 mt-4">{renderProductColors}</div>

          <div>{errors.tempColors && <ErrorMsg msg={errors.tempColors} />}</div>

          <div className="flex flex-wrap items-start justify-start space-x-1 space-y-1 my-4">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <HexadecimalColor color={color} key={color} />
            ))}
          </div>

          <div className="flex space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
              Update
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 flex-1"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
