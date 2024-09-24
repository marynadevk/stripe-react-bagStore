import { createContext, useState } from 'react';
import SHOP_DATA from '../shop-data/dummy-data';


type Product = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

type ProductsContextType = {
  products: Product[];
};

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const ProductsContextProvider = ({ children }: Props) => {
  const [products] = useState(SHOP_DATA);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
