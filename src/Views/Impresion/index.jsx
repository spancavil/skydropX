import React, { useContext, useEffect, useRef, useState } from 'react';
import { InfoData } from '../../Context/InfoProvider';
import styles from './styles.module.scss';
import FlowBackground from '../../Global-Components/FlowBackground';

import envioExitoso from '../../Assets/img/envioExitoso.png'
import Button from '../../Global-Components/Button';
import InfoIcon from '../../Assets/svg/infoIcon';
import ModalSend from './Components/ModalSend';
import SkydropService from '../../Services/Skydrop.service';
import SwalAlert from '../../Utils/sweetAlert';
import WebViewer from '@pdftron/pdfjs-express-viewer';
import Button2 from '../../Global-Components/Button2';
import { useNavigate } from 'react-router-dom';

const licenseKey = process.env.REACT_APP_LICENSE_WEB_VIEWER;

console.log(process.env)

console.log(licenseKey);

const Impresion = () => {
    const { linkPdf, order_id, resetValues, deliveryTypeSelected, setCPView } = useContext(InfoData);

    const [viewerState, setViewerState] = useState(true);
    const [sendLabel, setSendLabel] = useState(false);
    const [sendingState, setSendingState] = useState("");

    const viewer = useRef(null);
    let oxxo;
    if (Object.keys(deliveryTypeSelected).length !== 0) {
        oxxo = Object.keys(deliveryTypeSelected)[0] === "OXX" ? true : false
    }

    const navigate = useNavigate();

    const handleTerminate = (value) => {
        console.log(value);
        if (value === "nuevo"){
            resetValues();
            setCPView(true);
            navigate('/');
        } else {
            resetValues();
            setCPView(false);
            navigate('/');
        }
    }

    useEffect(() => {

        if (viewerState) {
            WebViewer({
                initialDoc: linkPdf,
                licenseKey: licenseKey,
            }, viewer.current)
                .then(instance => {
                    const { Core } = instance;
    
                    instance.setPrintQuality(4);

                    const renderPrint = () => {
                        return (
                            <h3 
                                onClick={()=>instance.printInBackground()}
                                style = {{
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Imprimir
                            </h3>
                        )
                    }

                    const printMessage = {
                        type: 'customElement',
                        render: renderPrint,
                    }
    
                    const printButton = {
                        type: 'actionButton',
                        img: '/printIcon.png',
                        title: '',
                        onClick: async () => {
                            instance.printInBackground()
                        },
                        dataElement: 'printButton',
                    }
    
                    // Add a new button that alerts "Printing" when clicked
                    instance.UI.setHeaderItems((header) => {
                        const headerUpdated = header.getItems().slice(8, 9)
                        header.update(headerUpdated); //erase all items
                        header.push(printMessage)
                        header.push(printButton)
                        // console.log(header.getItems());
                    })
    
                    // adding an event listener for when a document is loaded
                    Core.documentViewer.addEventListener('documentLoaded', () => {
                        console.log('document loaded');
                    });
    
                    // adding an event listener for when the page number has changed
                    Core.documentViewer.addEventListener('pageNumberUpdated', (pageNumber) => {
                        console.log(`Page number is: ${pageNumber}`);
                    });
    
                });
        }

        //THIS WORKS ON BROWSERS
        /* let objFra = document.getElementById('pdfDocument');
        objFra.style.visibility = "hidden";
        objFra.onload = () => {
            console.log("Entro aquí");
            objFra.contentWindow.focus();
            objFra.contentWindow.print();
        }
        */

        /**
         * Prints a PDF in a browser using a hidden iframe. Works in recent versions of Firefox, Chrome, Safari and Edge. Does
         * not work in IE 11 and instead attempts to open the PDF in a new tab.
         *
         * Note that the PDF URL must come from the same domain as the page including this file because of the same-origin
         * policy.
         *
         * Usage: printPdf(url)
         */
        /* var printPdf = (function () {
            // Firefox requires a delay between loading the iframe and calling print(), otherwise it fails with an uncatchable
            // error. This makes it a rare case where user agent sniffing is justified.
            var isFirefox = /Gecko\/\d/.test(navigator.userAgent);

            // Specify the aforementioned delay for Firefox. 1000 seems to work. 100 is not enough.
            var firefoxDelay = 1000;

            var iframe;

            return function (url) {
                // Remove iframe from any previous call
                if (iframe) {
                    iframe.parentNode.removeChild(iframe);
                }

                iframe = document.createElement("iframe");
                iframe.style.cssText = "width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0";

                var xhr = new XMLHttpRequest();
                try {
                    xhr.responseType = "arraybuffer";
                } catch (e) {
                    // This is probably IE 11, in which case we can go no further and just open the PDF in a new tab
                    window.open(url, "_blank");
                    return;
                }

                xhr.addEventListener("load", function () {
                    if (xhr.status === 200 || xhr.status === 201) {
                        var pdfBlob = new Blob([xhr.response], { type: "application/pdf" });
                        var iframeUrl = URL.createObjectURL(pdfBlob);
                        iframe.src = iframeUrl;

                        iframe.addEventListener("load", function () {
                            function printIframe() {
                                try {
                                    iframe.focus()
                                    try {
                                        iframe.contentWindow.document.execCommand("print", false, null);
                                    } catch (e) {
                                        iframe.contentWindow.print();
                                    }
                                } catch (error) {
                                    console.error("Print failed: " + error, error);
                                } finally {
                                    iframe.style.visibility = "hidden";
                                    iframe.style.left = "-1px";
                                    URL.revokeObjectURL(iframeUrl);
                                }
                            }

                            // Add a delay for Firefox
                            if (isFirefox) {
                                console.log("Es firefox");
                                window.setTimeout(printIframe, firefoxDelay);
                            } else {
                                printIframe();
                            }
                        });

                        document.body.appendChild(iframe);
                    }
                });

                xhr.open("GET", url, true);
                xhr.send();
            };
        })();

        printPdf('https://shipkraken-demo.s3.amazonaws.com/uploads/label/label_file/015fe3d5-ab76-427a-9ac1-715940da7bb8.pdf')
        */
    }, [linkPdf, viewerState])

    const handleSend = async (email) => {
        console.log("handleSend");
        setSendingState("pending");
        try {
            const response = await SkydropService.resendLabel(order_id, email)
            console.log(response);
            if (response.result === true) setSendingState("completed")
        } catch (error) {
            console.log(error);
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleCloseModal = () => {
        setSendLabel(false);
        setSendingState("");
    }

    console.log(linkPdf);

    return (
        <>
            {(linkPdf !== "" && viewerState) && (
                <>
                    <div className={styles.WebViewer} ref={viewer}></div>
                    <div className={styles.buttonContainer}>
                        <Button
                            text="Cerrar"
                            width='172px'
                            color='outlined'
                            onClick={() => setViewerState(false)}
                        />
                    </div>
                </>
            )
            }
            {!viewerState && <FlowBackground>
                <div className={styles.container}>
                    <div className={styles.tareaCumplida}>
                        <img
                            src={envioExitoso}
                            alt="envio-exitoso"
                        />
                        <div className={styles.textContainer}>
                            <h2 className={styles.title}>Creamos tu envío con éxito</h2>
                            <h2 className={styles.subtitle}>Tu guía y ticket ya están impresos.</h2>
                            <Button
                                text="Enviar guía por correo electrónico"
                                width={'381px'}
                                color="outlined"
                                canContinue={false}
                                onClick={() => setSendLabel(true)}
                            />
                        </div>
                    </div>
                    <div className={styles.acercate}>
                        <h2 className={styles.acercateTitle}>{oxxo ? "Ahora acércate a la caja y paga el envío" : "Ahora, paga el envío en la caja y entrega el paquete en una sucursal"}</h2>
                        <div className={styles.textInfo}>
                            <InfoIcon />
                            <h3 className={styles.acercateSub2}>Recuerda que el envío será válido cuando realices el pago.</h3>
                        </div>
                        <h3 className={styles.acercateSub}>¿No se imprimió la guía? Da <span onClick={() => setViewerState(true)}>clic aquí para reimprimir</span></h3>
                    </div>
                    <div className={styles.duda}>
                        <h3 className={styles.dudaTitle}>Si tienes alguna duda o consulta, escríbenos a <span>clientes@skydropx.com</span></h3>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Button
                            text="Finalizar"
                            width='130px'
                            color = "outlined"
                            onClick={() => handleTerminate("finalizar")}
                        />
                        <Button2
                            text="Crear nuevo envío"
                            width='230px'
                            canContinue={true}
                            handleContinue={() => handleTerminate("nuevo")}
                        />
                    </div>
                </div>
                {sendLabel && (
                    <ModalSend
                        handleClose={handleCloseModal}
                        handleSend={handleSend}
                        sendingState={sendingState}
                    />)
                }
            </FlowBackground>}
        </>
    )
}

export default Impresion;