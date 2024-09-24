import React, { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import ProductItem from '../shared/ProductItem';
import { IProduct } from '../../interfaces';

const ProductsCollection = () => {
  const context = useContext(ProductsContext);
  const productItems = context?.products
    .filter((_, i) => i < 4)
    .map((prod: IProduct) => <ProductItem product={prod} key={prod.id} />);

  return (
    <div className="featured-collection container">
      <h2 className="featured-section-title">Featured Collection</h2>
      <div className="products">{productItems}</div>
    </div>
  );
};

export default ProductsCollection;
