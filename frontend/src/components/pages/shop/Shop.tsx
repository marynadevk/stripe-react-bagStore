import { useContext } from 'react';
import Layout from '../../shared/Layout';
import { ProductsContext } from '../../../context/productsContext';
import './shop.styles.scss';
import { IProduct } from '../../../interfaces';
import ProductItem from '../../shared/ProductItem';

const Shop = () => {
  const context = useContext(ProductsContext);
  const allProducts =
    context?.products?.map((prod: IProduct) => (
      <ProductItem product={prod} key={prod.id} />
    )) || [];

  return (
    <Layout>
      <div className="product-list-container">
        <h2 className="product-list-title">Shop</h2>
        <div className="product-list">{allProducts}</div>
      </div>
    </Layout>
  );
};

export default Shop;
