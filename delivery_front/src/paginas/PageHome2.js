import React from 'react';
import Encabezado from '../pantillas/cajero/encabezado'
import Cuerpo from '../pantillas/cajero/cuerpo'
import Productos from '../pantillas/cajero/productos'
import Pie from '../pantillas/cajero/pie'

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