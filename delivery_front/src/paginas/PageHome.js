import React from 'react';
import Encabezado from '../pantillas/admin/encabezado'
import Cuerpo from '../pantillas/admin/cuerpo'
import Productos from '../pantillas/admin/productos'
import Pie from '../pantillas/admin/pie'

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