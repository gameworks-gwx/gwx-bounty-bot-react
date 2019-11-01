import React from 'react';
import Responsive from '../../components/UI/Responsive'
import MobileHome from './MobileHome';
import PCHome from './PCHome';

const Home = () => {
  return (
    <>
      <Responsive device="mobile">
        <MobileHome />
      </Responsive>

      <Responsive device="pc">
        <PCHome />
      </Responsive>
    </>
  )
}

export default Home