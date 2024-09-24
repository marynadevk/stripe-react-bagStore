
import Hero from '../hero/Hero';
import MainSection from '../main-section/MainSection';
import ProductsCollection from '../products-collection/ProductsCollection';
import Layout from '../shared/Layout';


const HomePage = () => {
  return (
    <>
      <Layout>
        <Hero />
        <MainSection />
        <ProductsCollection />
      </Layout>
    </>
  );
}

export default HomePage;