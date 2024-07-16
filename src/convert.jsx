import React, { useState } from 'react';
import './convertStyle.css';
import heart from './assets/heart-icon.svg';
import flecha from './assets/icon-flecha-other.svg';
import agregarNuevaConversion from './services/operacionNumero';

const ConvertApp = ({onAgregarNuevoNumero}) =>{
    
    const [resultado,setResultado] = useState(0);
    const [numero,setNumero] = useState(0);
    const [option,setOption] = useState('millas');
    const [unidad,setUnidad] = useState('km');
    
    const handleChange = (ev) =>{
        const {value}=ev.target;
        setNumero(value);
        conversion(option, value);
    }

    

    const conversion = (selectedOption,inputValue)=>{
        setOption(selectedOption);

        switch(selectedOption){
            case 'millas':
            const millas = inputValue * 0.621371;
            setResultado(millas.toFixed(2));
            break;
            
            case 'km':
            const kilometraje = inputValue * 1.60934;
            setUnidad('millas');
            setResultado(kilometraje.toFixed(2));
            break;

            case 'metros':
            const metros = inputValue * 0.3048;
            setUnidad('pies');
            setResultado(metros.toFixed(2));
            break;

            case 'pies':
            const pies = inputValue/0.3048;
            setUnidad('metros');
            setResultado(pies.toFixed(2));

            case 'pulgadas':
            const pulgadas = inputValue * 0.393701;
            setUnidad('centímetros');
            setResultado(pulgadas.toFixed(2));
            break;

            case 'cm':
            const centimetros = inputValue * 2.54;
            setUnidad('pulgadas');
            setResultado(centimetros.toFixed(2));
        }
    
    }

    const guardarNumeroConvertido = async ()=>{
        let operacion = numero + " " +  unidad + " → " + resultado + " " + option;     
        let response = await agregarNuevaConversion(operacion);

        if(response && response.codigo === 0){
            onAgregarNuevoNumero(response.numeroAniadido);   
        } else {
            console.log('Algo ha ido mal...',response)
        }
    }

    return(
        <>
            <div className="container-convert">
                <div className='rectangulo'>
                    <span className='convert-title'>convert</span>
                    <div className='convert-main'>
                        <select onChange={(e) => conversion(e.target.value, numero)}>
                            <option value="millas">km → millas</option>
                            <option value="km">millas → km</option>
                            <option value="metros">pies → metros</option>
                            <option value="pies">metros → pies</option>
                            <option value="pulgadas">centímetros → pulgadas</option>
                            <option value="cm">pulgadas → centímetros</option>
                        </select>
                        <img src={flecha} alt='icono-corazon'/>
                        <div className='convert-input'>
                            <input type="number" name='numero' value={numero} onChange={handleChange} />
                            <span className='unidad'>{unidad}</span>
                        </div>
                    </div>
                    <div className='convert-bottom'>
                        <img src={heart} alt='icono-corazon' onClick={guardarNumeroConvertido} className='icon'/>
                        <span className='resultado'>{resultado} {option}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ConvertApp;