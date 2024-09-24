import React, { FC } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
        <main>
          {
            children
          }
        </main>
      <Footer />
    </>
  );
}

export default Layout;