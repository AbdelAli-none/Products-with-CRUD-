import type { ProductInputsNames } from "../types";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IFormInput {
  id: string;
  name: ProductInputsNames;
  label: string;
  type: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}

export interface IDefaultErrorsObject {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  tempColors: string;
}
