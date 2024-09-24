import React from 'react';
import { useNavigate } from 'react-router-dom';
import studioBag from '../../assets/product-jpeg.jpg';
import './mainSection.styles.scss';

const MainSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-section-container">
      <div className="main-section-middle">
        <div className="ms-m-image">
          <img src={studioBag} alt="studio bag" />
        </div>
        <div className="ms-m-description">
          <h2>"Embrace the Boho Spirit. Perfect for Every Occasion."</h2>
          <p>
            Our Boho Small Bag is designed to complement your free-spirited
            style. Whether you're heading to a casual brunch or an evening out,
            this bag transitions seamlessly with you. Crafted with care, each
            piece embodies the essence of bohemian elegance, offering both
            functionality and flair.
          </p>

          <button
            className="button shop-now-btn"
            id="shop-now"
            onClick={() => navigate('/product/1')}
          >
            STUDIO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
