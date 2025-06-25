/**
 *
 * @param text
 * @returns
 */

export const shorten = (text: string) => {
  if (text.length > 100) return text.slice(0, 100) + "...";
  return text;
};

/**
 *
 * @param product
 * @returns
 */

export const validateProduct = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const { title, description, imageURL, price, colors: tempColors } = product;

  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    tempColors: string;
  } = { title: "", description: "", imageURL: "", price: "", tempColors: "" }; // by default

  // Image URL Validation
  const validURL = /^(ftp|http|https):\/\/.+$/.test(imageURL);
  if (!imageURL.trim() || !validURL) {
    errors.imageURL = "your image link is not valid!";
  }

  // Title Product Validation
  if (title.trim().length < 10) {
    errors.title = "your title must be longer!";
  } else if (title.trim().length > 40) {
    errors.title = "your title must be shorter!";
  }

  // Description Product Validation
  if (description.trim().length < 20) {
    errors.description = "your description must be longer!";
  } else if (description.trim().length > 150) {
    errors.description = "your description must be shorter!";
  }

  // Price Product Validation
  if (!price.trim() || Number.isNaN(Number(price))) {
    errors.price = "valid price is required!";
  }

  // Temp Colors Validation
  if (!tempColors.length) {
    errors.tempColors = "select at least one color!";
  }
  return errors;
};

/**
 *
 * @param x : the price of the product (string)
 * @returns add comma between at least two numbers one of them it's length is 3
 */

export const addCommas = (x: string): string => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
