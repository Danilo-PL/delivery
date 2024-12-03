import React from 'react';
import Encabezado from '../pantillas/encabezado'
import Cuerpo from '../pantillas/cuerpo'
import Productos from '../pantillas/productos'
import Pie from '../pantillas/pie'

const PageHome = () => {
   return(
   <React.StrictMode>
      <Encabezado></Encabezado>
      <Cuerpo></Cuerpo>
      <Productos></Productos>
      <Pie></Pie> 
   </React.StrictMode>
   );
};


export default PageHome;