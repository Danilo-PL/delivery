const {setLogin, setCerrarSesion} = useContextUsario();

useEffect(()=>{
    setCerrarSesion();
}, [setCerrarSesion]);

const navigate = useNavigate();

const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        if(username === "" || pasword === ""){
            mostrarAlerta("Complete los Campos", "warning");
            return;
        }
        await AxiosPublico.post(usuarioIniciarSesion,{
            login: username,
            contrasena: password,
        })
        .then(async (data)=>{
            const json = data.data;
            console.log(data.data);
            try{
                var usuario = json.Usuario;
                var token = json.Token;
                mostrarAlerta(
                    "Bienvenido(a) " + usuario.datoPersonales.nombreCompleto,
                    "success"
                );
                await setLogin({usuario:usuario, token:token});
                navigate("/app/home");
            }catch(error){
                console.error(error);
            }
        })
        .catch((error) =>{
            console.log(error);
            if(Array.isArray(error.response.data)){
                error.response.data.msj.forEach((f)=>{
                    mostrarAlerta("Campo:"+ f.msj,"warning");
                });
            }else{
                mostrarAlerta(error.response.data.error, "warning");
            }
        });
    }catch(error){
        console.log("Error:", error);
        mostrarAlerta("Error en la paticion", "error");
    }
};