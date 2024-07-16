import React from 'react';
import './layoutStyle.css';
import icon from '../assets/delete-icon.svg';
import ConvertApp  from '../convert.jsx';
import flecha from '../assets/icon-flecha.svg';
import {recuperarOperaciones,eliminarOperacion} from '../services/operacionNumero.js'
import { useState, useEffect } from 'react';

export const MainLayout = () =>{

    const [operaciones, setOperaciones] = useState([])

    useEffect(()=>{
        async function recuperarOperacionesHechas(){
            let respuesta = await recuperarOperaciones();
            setOperaciones(respuesta);
            console.log('operaciones recuperadas: ',operaciones);
        }
        recuperarOperacionesHechas();
    },[])

    useEffect(() => {
        console.log('operaciones actualizadas: ', operaciones);
    }, [operaciones]);

    const agregarOperacion = (nuevaOperacion)=>{
        setOperaciones([...operaciones,nuevaOperacion]);
    }


    const eliminarConversion = async (idOperacion) =>{
        setOperaciones(operaciones.filter((op)=>op._id !== idOperacion));
        let resp = await eliminarOperacion(idOperacion);
        if(resp.codigo = 0){
            console.log('Se ha eliminado correctamente');
        }else{
            console.log('Algo no ha ido bien');
        }
    }

    return(
        <>
            <div className='container'>
                <nav className='nav'>
                 
                    <img src={flecha} alt="flecha" className='icon-flecha'/>
                    <span className='title'><strong> unit converter </strong></span>
                   
                </nav>
                <main className='main'>
                    <ConvertApp onAgregarNuevoNumero={agregarOperacion}/>
                <div className='datos'>
                 <span className='nota'>Saved</span>
                 <div className='datos-recuperados'>
                    <ul>
                     {operaciones.map((operacion) => (
                        <li key={operacion._id}>
                            {operacion.numeroConvertido}
                            <img src={icon} alt={icon} onClick={()=>eliminarConversion(operacion._id)} />
                        </li>
                     ))}
                    </ul>
                 </div>
                </div>
                    
                </main>
                <footer className='footer'>
                    <span className='terms'>Terms of service</span>
                    <span className='privacy'>Privacy policy</span>
                </footer>
            </div>
        </>
    )
}