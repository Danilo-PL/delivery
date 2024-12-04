import React from 'react';

const Pie = () => {
    return (
        <>
            <div className="container-fluid bg-dark text-light has-height-md middle-items border-top text-center wow fadeIn">
                <div className="row">
                    <div className="col-sm-3">
                        <h3>CORREO</h3>
                        <p className="text-muted">foodhut@gmail.com</p>
                    </div>
                    <div className="col-sm-3">
                        <h3>CONTACTANOS</h3>
                        <p className="text-muted"> 2256-7865</p>
                    </div>
                    <div className="col-sm-3">
                        <h3>UBICADOS</h3>
                        <p className="text-muted">Universidad Catolica de Honduras Campus Jesus Sacramentado, Siguatepeque</p>
                    </div>
                    <div className="col-sm-3">
                    <h3>EVENTOS</h3>
                    <p className="text-muted">Noches Veneficas, Eventos Especiales</p>
                    </div>
                </div>
            </div>
            <div className="bg-dark text-light text-center border-top wow fadeIn">
            </div>
        </>
    );
};

export default Pie;





