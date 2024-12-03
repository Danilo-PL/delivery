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
                        <h3>LLAMANOS</h3>
                        <p className="text-muted">(+504) 9712-8524</p>
                    </div>
                    <div className="col-sm-3">
                        <h3>UBICADOS</h3>
                        <p className="text-muted">UNICAH Campus Jesus Sacramentado</p>
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





