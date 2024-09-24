import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/productsContext';
import { CartContext } from '../../context/cartContext';
import Layout from '../shared/Layout';
import './singleProduct.styles.scss';
import { IProduct } from '../../interfaces';

type Params = {
  id: string;
};

const SingleProduct: React.FC = () => {
  const context = useContext(ProductsContext);
  const allProducts = context?.products;
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const { id } = useParams<Params>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allProducts) {
      return;
    }
    const product = allProducts.find((item) => Number(item.id) === Number(id));

    if (!product) {
      return navigate('/shop');
    }

    setProduct(product);
  }, [id, navigate, allProducts]);

  if (!product) {
    return null;
  }

  const { imageUrl, title, price, description } = product;
  const itemInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Layout>
      <div className="single-product-container">
        <div className="product-image">
          <img src={imageUrl} alt="product" />
        </div>
        <div className="product-details">
          <div className="name-price">
            <h3>{title}</h3>
            <p>$ {price}</p>
          </div>
          <div className="add-to-cart-btns">
            {!itemInCart && (
              <button
                className="button is-white baggo-btn"
                id="btn-white-outline"
                onClick={() => addProduct({ ...product, quantity: 1 })}
              >
                ADD TO CART
              </button>
            )}
            {itemInCart && (
              <button
                className="button is-white baggo-btn"
                id="btn-white-outline"
                onClick={() => increase({ ...product, quantity: 1 })}
              >
                ADD MORE
              </button>
            )}
            <button
              className="button is-black baggo-btn"
              id="btn-white-outline"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="product-description">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
