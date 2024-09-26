import { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import Layout from '../shared/Layout';
import ShippingAddress from './custom-checkout/ShippingAddress';
import { IShippingData } from '../../interfaces';
import './checkout.styles.scss';
import CustomCheckout from './custom-checkout/CustomCheckout';

const Checkout = () => {
  const { itemCount, total, cartItems } = useContext(CartContext);
  const [shipping, setShipping] = useState<IShippingData | null>(null);
  const addressShown = {
    display: (shipping ? 'none' : 'block')
  }
  const cardShown = {
    display: (shipping ? 'block' : 'none')
  }
  return (
    <Layout>
      <div className='checkout'>
        <h2>Checkout Summary</h2>
        <h3>{`Total Items: ${itemCount}`}</h3>
        <h4>{`Amount to Pay: $${total}`}</h4>
        <div style={addressShown}>
          <ShippingAddress setShipping={setShipping} />
        </div>
        <div style={cardShown}>
          <CustomCheckout shipping={shipping as IShippingData} cartItems={cartItems}/>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;