
export const agregarNuevaConversion = async(resultado) => {
    try {
        const url = 'http://localhost:3000/api/AgregarConversion';
        const resp = await fetch(url,
              {
                method: 'POST',
                body: JSON.stringify({resultado: resultado}),
                headers: { 'Content-Type': 'application/json '}
                
              }
        );
        return await resp.json();
    } catch (error) {
        console.log('No se ha podido agregar una nueva conversion ', error);
    }
}

export const recuperarOperaciones = async() => {
    try {

        const url = 'http://localhost:3000/api/recuperarOperaciones';
        
        let data = await fetch(url,{method:'GET'});

        return await data.json();
        
    } catch (error) {
        console.log('Ha habido un error en la pet recuperarOperaciones ', error);
        return [];

    }

}

export const eliminarOperacion = async(idOperacion)=>{
    try{
    
        const url = 'http://localhost:3000/api/eliminarOperacion';
        const resp = await fetch(url,{
            method:'POST',
            body: JSON.stringify({idOperacion}),
            headers: {'Content-Type':'application/json '}
        });
        await resp.json();

    }catch(error){
        console.log('No se ha podido realizar la eliminacion', error);
    }
}



export default agregarNuevaConversion;