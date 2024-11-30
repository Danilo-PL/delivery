const nodemailer = require('nodemailer');
const {USUARIO_CORREO, CONTRASENA_CORREO, HOST_CORREO} = process.env

exports.enviarCorreo= async(datos)=>{
    const transporter = nodemailer.createTransport({
        host: HOST_CORREO,//servicios como hotmail, yahoo, gmail,etc.
        port:465,
        secure:true,
            auth: {
                user: USUARIO_CORREO,//direccion de correo
                pass: CONTRASENA_CORREO//contrasena
            }
    });

    //datos del correo electronico
    const mailOptions = {
        from:USUARIO_CORREO,
        to:datos.para,
        subject: datos.asunto,
        text: datos.descripcion,
        html: datos.html
    };

    //enviar el correo electronico
    return transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log('Correo enviado: '+ info.response);
    });
}

