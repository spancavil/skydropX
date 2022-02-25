import React, { useContext, useEffect, useState } from 'react';
import { InfoData } from '../../Context/InfoProvider';
import './styles.module.scss';

const Impresion = () => {
    const { linkPdf } = useContext(InfoData);
    
    useEffect(()=> {

        let objFra = document.getElementById('pdfDocument');
        objFra.style.visibility = "hidden";
        objFra.onload = () => {
            objFra.contentWindow.focus();
            objFra.contentWindow.print();
        }

    }, [])

    return (
        <>
            {linkPdf && (
                <>
                    <iframe
                    src= {linkPdf}
                    id="pdfDocument"
                    style={{
                        width: "100vw",
                        height: '100vh'
                    }}
                    title="iframe"
                    />
                </>
                )
            }
            <h2>Termino de imprimir</h2>
        </>
    )
}

export default Impresion;