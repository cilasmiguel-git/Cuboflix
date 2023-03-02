//libraries
import React from 'react';

import { Route, Routes } from 'react-router-dom';

//imports file
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Catalog from '../pages/Catalog';

const Generalroutes = () => {
  return (
    <Routes>
      <Route path='/:category/search/:keyword' element={<Catalog />} />
      <Route path='/:category/:id' element={<Detail />} />
      <Route path='/:category' element={<Catalog />} />
      <Route path='/' index element={<Home/>}/>
    </Routes>
  )
}

export default Generalroutes ;