import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/Layout';

const Canceled = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="checkout">
        <h1>Payment failed</h1>
        <p>Payment was not successful</p>
        <div>
          <button
            className="button is-black baggo-btn submit"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Canceled;
