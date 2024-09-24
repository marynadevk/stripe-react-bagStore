import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cartContext';
import './productItem.scss';
import { IProduct } from '../../interfaces';
import { isInCart } from '../../helpers/helpers';

type Props = {
  product: IProduct;
};

const ProductItem: FC<Props> = ({
  product: { title, imageUrl, price, id, description },
}: {
  product: IProduct;
}) => {
  const product = { title, imageUrl, price, id, description, quantity: 1 };
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const itemInCart = isInCart(product, cartItems);
  const navigate = useNavigate();

  return (
    <div className="featured-product">
      <div
        className="featured-image"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img src={imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h3>{title}</h3>
        <p>$ {price}</p>

        {!itemInCart && (
          <button
            className="button is-black baggo-btn"
            onClick={() => addProduct(product)}
          >
            ADD TO CART
          </button>
        )}
        {itemInCart && (
          <button
            className="button baggo-btn"
            onClick={() => increase(product)}
            id="btn-white-outline"
          >
            ADD MORE
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
