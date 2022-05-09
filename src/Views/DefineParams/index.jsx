import React, { useContext, useState } from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss';
import InfoIcon from '../../Assets/svg/infoIcon';
import { InfoData } from "../../Context/InfoProvider";
import Button from "../../Global-Components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../Global-Components/Form";
import Button2 from "../../Global-Components/Button2";
import CustomDataList from "../../Global-Components/CustomDataList";
import SkydropService from "../../Services/Skydrop.service";
import SwalAlert from "../../Utils/sweetAlert";
import Terms from "./Modals/Terms";
import infoFilled from '../../Assets/img/infoFilledTooltip.png';
import Loader from "../../Global-Components/Loader";

const DefineParams = () => {

    //Possible params:
    //peso - servicio - paqueteria - remitente - destinatario - producto - entrega - confirmacion
    const {paramId} = useParams()

    console.log(paramId);
    
    //States for show or hide
    // const [weight, setWeight] = useState(true)
    // const [service, setService] = useState(false)
    // const [shipping, setShipping] = useState(false)

    //State para el loader
    const [shippingLoading, setShippingLoading] = useState(false);

    //Sender form states
    const [senderData, setSenderData] = useState({});

    const [receiverData, setReceiverData] = useState({});

    //Category states
    const [terms, setTerms] = useState(false);
    const [policies, setPolicies] = useState(false);

    const [category, setCategory] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [tooltip, setTooltip] = useState(false);

    const [subcategory, setSubcategory] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);

    const [clase, setClase] = useState(false);
    const [claseData, setClaseData] = useState([])

    console.log(`Category: ${category}`);
    console.log(`Subcategory: ${subcategory}`);
    console.log(`Clase: ${clase}`);

    //Delivery states
    // const [delivery, setDelivery] = useState(false);
    // const [deliveryData, setDeliveryData] = useState({})

    //Confirm data loading
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [block, setBlock] = useState(false) //Bloquea momentáneamente las cards para que no se le haga click

    const {
        WEIGHTS, SERVICE_TYPES, codigosPostales, stateAndCity, sizePackage, servicePackage, shippingPackage,
        setSizePackage, getServices, senderDataCtx, receiverDataCtx, deliveryTypes, deliveryTypeSelected, subcategoryIdCtx, classCodeCtx,
        setServicePackage, setShippingPackage, setShippingAvailable, getShippingServices, setSenderDataCtx, setReceiverDataCtx, getDeliveryTypes,
        setDeliveryTypeSelected, setSubcategoryIdCtx, setClassCodeCtx, setClaseNombre, setLinkPdf, setTicketLinkPdf, setOrder_id,
        categorySelected, setCategorySelected, subCategorySelected, setSubCategorySelected, claseSelected, setClaseSelected, shippingAvailable
    } = useContext(InfoData);

    const navigate = useNavigate();

    const defineSize = async (size) => {
        setSizePackage(size);
        getServices(size);
        navigate('/definir-parametros/servicio')

        //A comentar
        /* getDeliveryTypes();
        const response = await SkydropService.getCategories();
        setCategoryData(response.result.data);
        setCategory(true); */
    }

    const defineService = async (service) => {
        try {
            await setServicePackage(service);

            setShippingLoading(true);
            const shippings = await getShippingServices(Object.keys(service)[0])

            /* const shippingsHardcoded = ["EST", "FED", "CAR", "RED", "SEN"];
            setShippingAvailable(shippingsHardcoded) //Saves in context */
            setShippingAvailable(shippings);
            navigate('/definir-parametros/paqueteria')

        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const defineShipping = (shipping) => {
        setShippingPackage(shipping);
        navigate('/definir-parametros/remitente')
    }

    const handleFormSender = () => {
        setSenderDataCtx({
            ...senderDataCtx,
            address_from: {
                province: stateAndCity.stateOrigen,
                city: stateAndCity.cityOrigen || "",
                name: senderData.nombreCompleto,
                zip: codigosPostales.origen,
                country: "MX",
                address1: senderData.calle,
                company: "skydropx",
                address2: senderData.colonia,
                phone: senderData.telefono,
                email: senderData.correoElectronico,
                reference: senderData.referencia,
            }
        })
        navigate('/definir-parametros/destinatario')
    }

    const handleFormReceiver = async () => {
        setReceiverDataCtx({
            ...receiverDataCtx,
            address_to: {
                province: stateAndCity.stateDestino,
                city: stateAndCity.cityDestino || "",
                name: receiverData.nombreCompleto,
                zip: codigosPostales.destino,
                country: "MX",
                address1: receiverData.calle,
                company: "skydropx",
                address2: receiverData.colonia,
                phone: receiverData.telefono,
                email: receiverData.correoElectronico,
                reference: receiverData.referencia,
            }
        })

        try {
            getDeliveryTypes();
            const response = await SkydropService.getCategories();
            setCategoryData(response.result.data);
            navigate('/definir-parametros/producto')
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleSelectCategory = async (item) => {
        setSubcategory(true);
        setCategorySelected(item?.attributes.name);
        try {
            const response = await SkydropService.getSubcategories(item.id);
            setSubCategoryData(response.result.data);
            setSubCategorySelected("");
            setClaseSelected("");
            setCategory(false);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleSelectSubCategory = async (item) => {
        setClase(true);
        setSubCategorySelected(item?.attributes.name);
        setSubcategoryIdCtx(item?.id);
        try {
            const response = await SkydropService.getClasses(item?.id);
            setClaseData(response.result.data);
            setClaseSelected("")
            setSubcategory(false);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleClase = async (item) => {
        setClassCodeCtx(item?.attributes?.code);
        setClaseSelected(item?.attributes.name);
        setClaseNombre(item?.attributes?.name);
    }

    const handleContinueCategory = () => {
        navigate('/definir-parametros/entrega')
    }

    const defineDelivery = (delivery) => {
        setDeliveryTypeSelected(delivery);
        navigate('/definir-parametros/confirmacion')

    }
    const handleEditForm = (type) => {
        console.log(type);
        switch (type) {
            case "sender":
                navigate('/definir-parametros/remitente')
                break;
            case "receiver":
                navigate('/definir-parametros/destinatario')
                break;
            case "category":
                setClase(false)
                setSubcategory(false)
                setCategory(true)
                navigate('/definir-parametros/producto')
                break;
            default:
                break;
        }
    }
    const handleBack = () => {
        console.log(paramId);
        if (paramId === "peso") {
            setSizePackage("");
            navigate("/codigos-postales");
        }
        if (paramId === "servicio") {
            setSizePackage("")
            navigate("/definir-parametros/peso");
        }
        if (paramId === "paqueteria") {
            setServicePackage("")
            navigate("/definir-parametros/servicio");
        }
        if (paramId === "remitente") {
            setShippingPackage("");
            navigate("/definir-parametros/paqueteria");
        }
        if (paramId === "destinatario") {
            navigate("/definir-parametros/remitente");
        }
        if (paramId === "producto") {
            navigate("/definir-parametros/destinatario");
        }
        else if (paramId === "entrega") {
            navigate("/definir-parametros/producto");
        }
        if (paramId === "confirmacion") {
            setDeliveryTypeSelected({});
            navigate("/definir-parametros/entrega");
        }
    }

    const handlePrint = async () => {
        setConfirmLoading(true);
        const service_tag = Object.keys(servicePackage)[0].includes("standard") ? "STD" : "EXP";
        const method_tag = Object.keys(deliveryTypeSelected)[0];
        if (senderDataCtx.address_from &&
            receiverDataCtx.address_to &&
            sizePackage &&
            classCodeCtx &&
            subcategoryIdCtx &&
            service_tag &&
            shippingPackage &&
            method_tag) {

            try {
                const response = await SkydropService.createShipmentAndLabel(
                    senderDataCtx.address_from,
                    receiverDataCtx.address_to,
                    sizePackage,
                    classCodeCtx,
                    subcategoryIdCtx,
                    service_tag,
                    shippingPackage,
                    method_tag
                )
                setConfirmLoading(false);
                if (response.result !== undefined) {
                    setLinkPdf(response.result?.label_url);
                    setTicketLinkPdf(response.result?.ticket_url);
                    setOrder_id(response.result?.order_id);
                    navigate('/impresion')
                } else {
                    navigate('/error-pdf')
                }
            }
            catch (error) {
                navigate('/error-pdf')
                // navigate("/");
            }
        }
    }

    const handleCloseTerms = () => {
        setTerms(false);
        setPolicies(false);
    }

    console.log(`Confirm loading: ${confirmLoading}`);

    return (
        <FlowBackground>
            <div className={styles.container}>
                {paramId !== "confirmacion" && <Feedback
                    position={{ x: "70px", y: "92px" }}
                />}
                {paramId === "peso" && (
                    <>
                        <h1 className={styles.title}>¿Cuál es el peso de tu envío?</h1>
                        <div className={styles.cardContainer}>
                            {WEIGHTS.map(weight => {
                                return <Card type="weight" content={weight} key={weight} onClick={defineSize} block={block} setBlock={setBlock} />
                            })}
                        </div>
                        <div className={styles.subContainer}>
                            <InfoIcon />
                            <h2 className={styles.subtitle}>El paquete no puede exceder los 154 cm lineales. Para calcularlos suma el alto, ancho y largo.</h2>
                        </div>
                    </>
                )}
                {paramId === "servicio" && (
                    shippingLoading ?
                    <Loader text={`Estamos buscando paqueterías disponibles`}/>
                    :
                    <>
                        <h1 className={styles.title}>¿Qué precio y tipo de servicio prefieres?</h1>
                        <div className={styles.cardContainer}>
                            {SERVICE_TYPES?.map((serviceCost, idx) => {
                                return <Card type="service" content={serviceCost} key={idx} onClick={defineService} block={block} setBlock={setBlock} />
                            })}
                        </div>
                    </>
                    )
                }
                {paramId === "paqueteria" && 
                    <>
                        <h1 className={styles.title}>Estas son las paqueterías disponibles para<br />tus códigos postales</h1>
                        <div className={styles.cardContainerShipping}>
                            {shippingAvailable?.map(shipping => {
                                return <Card type="shipping" content={shipping} key={shipping} onClick={defineShipping} block={block} setBlock={setBlock} />
                            })}
                        </div>
                    </>
                }
                {paramId === "remitente" && <Form
                    width={'calc(100vw - 170px)'}
                    // height={"490px"}
                    codigoPostal={codigosPostales.origen}
                    stateAndCity={stateAndCity}
                    setData={setSenderData}
                    formSender={true}
                />}

                {paramId === "destinatario" && <Form
                    width={'calc(100vw - 170px)'}
                    // height={"414px"}
                    codigoPostal={codigosPostales.destino}
                    stateAndCity={stateAndCity}
                    setData={setReceiverData}
                    formReceiver={true}
                />}

                {paramId === "producto" &&
                    <div className={styles.categoriesContainer}>
                        <h2 className={styles.titleCategory}>¿Qué tipo de producto vas a enviar?</h2>
                        <div className={styles.tooltipContainer}>
                            <h2 className={styles.subtitleCategory}>Contenido del paquete</h2>
                            <img
                                src={infoFilled}
                                alt="tooltip"
                                onClick={() => setTooltip(!tooltip)}
                            />
                            <div className={tooltip ? styles.tooltipVisible : styles.tooltipHidden}
                                onClick={() => setTooltip(false)}
                            >
                                <h4 className={styles.tiptext}>El Sistema de Administración Tributaria (SAT) solicita el complemento legal Carta Porte para realizar envíos.
                                    Se trata de una declaración jurada sobre lo que contiene el paquete y es una condición obligatoria.</h4>
                            </div>
                        </div>
                        <div className={styles.selectContainer}>
                            <CustomDataList
                                data={categoryData}
                                onSelect={handleSelectCategory}
                                disabled={!category}
                                type="Categoría*"
                                selected={categorySelected}
                            />
                            <CustomDataList
                                data={subCategoryData}
                                onSelect={handleSelectSubCategory}
                                disabled={!subcategory}
                                type="Subcategoría*"
                                selected={subCategorySelected}
                            />
                            <CustomDataList
                                data={claseData}
                                onSelect={handleClase}
                                disabled={!clase}
                                type="Producto*"
                                selected={claseSelected}
                            />
                        </div>
                        <h2 className={styles.terms}>Al continuar, confirmo que conozco y acepto los <span onClick={() => setTerms(true)}>términos</span> y <span onClick={() => setPolicies(true)}>políticas</span>.</h2>
                    </div>
                }

                {paramId === "entrega" &&
                    <>
                        <h1 className={styles.title}>¿Quieres entregar tu paquete en esta tienda?</h1>
                        <div className={styles.cardContainer}>
                            {deliveryTypes.map((delivery, idx) => {
                                return <Card type="delivery" content={delivery} key={idx} onClick={defineDelivery} block={block} setBlock={setBlock} />
                            })}
                        </div>
                    </>
                }

                {paramId === "confirmacion" && (
                    !confirmLoading ? 
                    <>
                        <h1 className={styles.titleConfirm}>Este es tu resumen de envío</h1>
                        <h3 className={styles.subtitleConfirm}>Con estos datos imprimiremos tu guía. Si necesitas editarlos, puedes hacerlo.</h3>
                        <div className={styles.confirmDataContainer}>
                            <Card
                                type="resumeSenderReceiver"
                                handleEdit={(type) => handleEditForm(type)}
                            />
                            <Card
                                type="resumeShipping"
                            />
                        </div>
                    </>
                    :
                    <Loader text={<p>Estamos creando tu guía.<br/>Aguarda un momento... </p>} />
                    )
                }

                {/* Buttons container */}
                <div className={styles.buttonContainer}>
                    {!confirmLoading && <Button text="Regresar" width="132px" color="outlined" onClick={() => handleBack()} />}
                    {paramId === "remitente" && <Button2 text="Continuar" width='132px' canContinue={Object.keys(senderData).length !== 0} handleContinue={handleFormSender} />}
                    {paramId === "destinatario" && <Button2 text="Continuar" width='132px' canContinue={Object.keys(receiverData).length !== 0} handleContinue={handleFormReceiver} />}
                    {paramId === "producto" && <Button2
                        text="Continuar"
                        width='132px'
                        canContinue={classCodeCtx && categorySelected && subCategorySelected && claseSelected}
                        handleContinue={handleContinueCategory} />}
                    {paramId === "confirmacion" && !confirmLoading && <Button2 text="Imprimir guía" width='172px' canContinue={true} handleContinue={handlePrint} />}
                </div>

                {(terms || policies) && <Terms handleClose={() => handleCloseTerms()} width="1000px" height={'656px'} type={terms ? "terms" : "policies"} />}
            </div>
        </FlowBackground>
    )
}

export default DefineParams;