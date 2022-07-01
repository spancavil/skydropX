import React, { useContext, useEffect, useRef, useState } from 'react';
import { InfoData } from '../../Context/InfoProvider';
import styles from './styles.module.scss';
import Button from '../../Global-Components/Button';
import WebViewer from '@pdftron/pdfjs-express-viewer';
import { useNavigate } from 'react-router-dom';
import ButtonImpresion from './Components/Button';
import printIcon from '../../Assets/img/printIcon.png';

const licenseKey = process.env.REACT_APP_LICENSE_WEB_VIEWER;

const Impresion = () => {
    const { linkPdf, ticketLinkPdf } = useContext(InfoData);

    const [viewerState, setViewerState] = useState('link');

    const viewerLink = useRef(null);
    const viewerTicket = useRef(null);

    const navigate = useNavigate();

    console.log(ticketLinkPdf);

    useEffect(() => {

        if (viewerState) {
            WebViewer({
                initialDoc: viewerState === "link" ? linkPdf : ticketLinkPdf,
                licenseKey: licenseKey,
            }, viewerState === "link" ? viewerLink.current : viewerTicket.current)
                .then(instance => {
                    // const { Core } = instance;

                    instance.setPrintQuality(4);

                    const renderPrint = () => {
                        return (
                            <ButtonImpresion
                                onClick={() => instance.printInBackground()}
                            >
                                    Imprimir
                                <img src={printIcon}
                                    alt="print-icon"
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginLeft: '10px',
                                    }}
                                />
                            </ButtonImpresion>
                        )
                    }

                    const printMessage = {
                        type: 'customElement',
                        render: renderPrint,
                    }

                    // Add a new button that alerts "Printing" when clicked
                    instance.UI.setHeaderItems((header) => {
                        const headerUpdated = header.getItems().slice(8, 9)
                        header.update(headerUpdated); //erase all items
                        header.push(printMessage)
                        // console.log(header.getItems());
                    })

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
    }, [linkPdf, viewerState, ticketLinkPdf])

    console.log(linkPdf);

    useEffect(() => {
        if (!viewerState) navigate('/envio-exitoso')
    }, [viewerState, navigate])

    return (
        <>
            {(linkPdf !== "" && ticketLinkPdf !== "" && viewerState) && (
                <>
                    {viewerState === "link" && <div className={styles.WebViewer} ref={viewerLink}></div>}
                    {viewerState === "ticket" && <div className={styles.WebViewer} ref={viewerTicket}></div>}
                    <div className={styles.buttonContainer}>
                        <Button
                            text={viewerState === "link" ? "Siguiente" : "Siguiente"}
                            width='150px'
                            color='outlined'
                            onClick={() => setViewerState(prev => {
                                if (prev === "link") return "ticket"
                                if (prev === "ticket") return false
                            })}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default Impresion;