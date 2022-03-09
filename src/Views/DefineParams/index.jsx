import React, { useContext, useState } from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss';
import InfoIcon from '../../Assets/svg/infoIcon';
import { InfoData } from "../../Context/InfoProvider";
import Button from "../../Global-Components/Button";
import { useNavigate } from "react-router-dom";
import Form from "../../Global-Components/Form";
import Button2 from "../../Global-Components/Button2";
import CustomDataList from "../../Global-Components/CustomDataList";
import SkydropService from "../../Services/Skydrop.service";
import SwalAlert from "../../Utils/sweetAlert";
import Terms from "./Modals/Terms";
import infoFilled from '../../Assets/img/infoFilledTooltip.png';

const DefineParams = () => {

    //States for show or hide
    const [weight, setWeight] = useState(true)
    const [service, setService] = useState(false)
    const [shipping, setShipping] = useState(false)

    //Sender form states
    const [formSender, setFormSender] = useState(false);
    const [senderData, setSenderData] = useState({});

    const [formReceiver, setFormReceiver] = useState(false);
    const [receiverData, setReceiverData] = useState({});

    //Category states
    const [terms, setTerms] = useState(false);
    const [policies, setPolicies] = useState(false);

    const [category, setCategory] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [tooltip, setTooltip] = useState(false);
    // const [categorySelected, setCategorySelected] = useState("");

    const [subcategory, setSubcategory] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);
    //const [subCategorySelected, setSubcategorySelected] = useState("");

    const [clase, setClase] = useState(false);
    const [claseData, setClaseData] = useState([])
    //const [claseSelected, setClaseSelected] = useState("");

    //Delivery states
    const [delivery, setDelivery] = useState(false);
    // const [deliveryData, setDeliveryData] = useState({})

    //Confirm data state
    const [confirmData, setConfirmData] = useState(false);

    const [block, setBlock] = useState(false) //Bloquea momentáneamente las cards para que no se le haga click
    const [shippingsOn, setShippingsOn] = useState(false)

    const {
        WEIGHTS, SERVICE_TYPES, codigosPostales, stateAndCity, sizePackage, servicePackage, shippingPackage,
        setSizePackage, getServices, senderDataCtx, receiverDataCtx, deliveryTypes, deliveryTypeSelected, subcategoryIdCtx, classCodeCtx,
        setServicePackage, setShippingPackage, setShippingAvailable, getShippingServices, setSenderDataCtx, setReceiverDataCtx, getDeliveryTypes,
        setDeliveryTypeSelected, setSubcategoryIdCtx, setClassCodeCtx, setClaseNombre, setLinkPdf, setOrder_id, setCPView
    } = useContext(InfoData);

    const navigate = useNavigate();

    const defineSize = async (size) => {
        setSizePackage(size);
        getServices(size);
        setWeight(false);
        setService(true);

        //A comentar
        /* getDeliveryTypes();
        const response = await SkydropService.getCategories();
        setCategoryData(response.result.data);
        setCategory(true); */
    }

    const defineService = async (service) => {
        try {
            await setServicePackage(service);
            setService(false)

            const shippings = await getShippingServices(Object.keys(service)[0])

            /* const shippingsHardcoded = ["EST", "FED", "CAR", "RED", "SEN"];
            setShippingAvailable(shippingsHardcoded) //Saves in context */

            setShippingsOn(shippings);
            setShippingAvailable(shippings);
            setShipping(true)
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const defineShipping = (shipping) => {
        setShippingPackage(shipping);
        setShipping(false)
        setFormSender(true)
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
        setFormSender(false);
        setFormReceiver(true)
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
        setFormReceiver(false);

        try {
            getDeliveryTypes();
            const response = await SkydropService.getCategories();
            setCategoryData(response.result.data);
            setCategory(true);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleSelectCategory = async (item) => {
        setSubcategory(true);
        // setCategorySelected(item.id);
        try {
            const response = await SkydropService.getSubcategories(item.id);
            setSubCategoryData(response.result.data);
            setCategory(false);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleSelectSubCategory = async (item) => {
        setClase(true);
        // setSubcategorySelected(item?.id);
        setSubcategoryIdCtx(item?.id);
        try {
            const response = await SkydropService.getClasses(item?.id);
            console.log(response);
            setClaseData(response.result.data);
            setSubcategory(false);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleClase = async (item) => {
        setClassCodeCtx(item?.attributes?.code);
        setClaseNombre(item?.attributes?.name);
    }

    const handleContinueCategory = () => {
        setCategory(false);
        setSubcategory(false);
        setClase(false);
        setDelivery(true);
    }

    const defineDelivery = (delivery) => {
        setDeliveryTypeSelected(delivery);
        setDelivery(false);
        setConfirmData(true);
    }
    const handleEditForm = (type) => {
        console.log(type);
        switch (type) {
            case "sender":
                setConfirmData(false)
                setFormSender(true);
                break;
            case "receiver":
                setConfirmData(false);
                setFormReceiver(true);
                break;
            case "category":
                setConfirmData(false);
                setCategory(true);
                break;
            default:
                break;
        }
    }
    const handleBack = () => {
        if (weight && !service && !shipping) {
            setSizePackage("");
            setCPView(true);
            navigate("/");
        }
        if (!weight && service && !shipping) {
            setSizePackage("")
            setService(false)
            setWeight(true)
        }
        if (!weight && !service && shipping) {
            setServicePackage("")
            setShipping(false)
            setService(true)
        }
        if (!weight && !service && !shipping && formSender) {
            setShippingPackage("");
            setFormSender(false)
            setShipping(true)
        }
        if (!weight && !service && !shipping && !formSender && formReceiver) {
            setFormReceiver(false);
            setFormSender(true);
        }
        if (!formReceiver && (category || subcategory || clase)) {
            setCategory(false);
            setSubcategory(false);
            setClase(false);
            setFormReceiver(true);
        }
        if (!category && delivery) {
            setDelivery(false);
            setCategory(true);
        }
        if (!delivery && confirmData) {
            setDeliveryTypeSelected({});
            setConfirmData(false);
            setDelivery(true);
        }
    }

    const handlePrint = async () => {
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
                console.log(response);
                if (response.result !== undefined) {
                    setLinkPdf(response.result?.label_url);
                    setOrder_id(response.result?.order_id);
                    navigate('/impresion')
                } else {
                    navigate('/error-pdf')
                }
            }
            catch (error) {
                SwalAlert("Error de comunicación con el servidor: " + error.message);
                navigate('/error-pdf')
                // navigate("/");
            }
        }
    }

    const handleCloseTerms = () => {
        setTerms(false);
        setPolicies(false);
    }

    return (
        <FlowBackground>
            <div className={styles.container}>
                {!confirmData && <Feedback
                    position={{ x: "70px", y: "92px" }}
                />}
                {weight && (
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
                {service &&
                    <>
                        <h1 className={styles.title}>¿Qué precio y tipo de servicio prefieres?</h1>
                        <div className={styles.cardContainer}>
                            {SERVICE_TYPES.map((serviceCost, idx) => {
                                return <Card type="service" content={serviceCost} key={idx} onClick={defineService} block={block} setBlock={setBlock} />
                            })}
                        </div>
                    </>
                }
                {shipping &&
                    <>
                        <h1 className={styles.title}>¿Qué paquetería eliges para realizar el envío?</h1>
                        <div className={styles.cardContainerShipping}>
                            {shippingsOn.map(shipping => {
                                return <Card type="shipping" content={shipping} key={shipping} onClick={defineShipping} block={block} setBlock={setBlock} />
                            })}
                        </div>
                    </>

                }
                {formSender && <Form
                    width={'calc(100vw - 170px)'}
                    // height={"490px"}
                    codigoPostal={codigosPostales.origen}
                    stateAndCity={stateAndCity}
                    setData={setSenderData}
                    formSender={true}
                />}

                {formReceiver && <Form
                    width={'calc(100vw - 170px)'}
                    // height={"414px"}
                    codigoPostal={codigosPostales.destino}
                    stateAndCity={stateAndCity}
                    setData={setReceiverData}
                    formReceiver={true}
                />}

                {(category || subcategory || clase) &&
                    <div className={styles.categoriesContainer}>
                        <h2 className={styles.titleCategory}>¿Qué tipo de producto vas a enviar?</h2>
                        <div className={styles.tooltipContainer}>
                            <h2 className={styles.subtitleCategory}>Contenido del paquete</h2>
                            <img
                                src={infoFilled}
                                alt="tooltip"
                                onClick={()=> setTooltip(!tooltip)}
                            />
                            <div className={tooltip ? styles.tooltipVisible : styles.tooltipHidden}
                            onClick = {()=> setTooltip(false)}
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
                            />
                            <CustomDataList
                                data={subCategoryData}
                                onSelect={handleSelectSubCategory}
                                disabled={!subcategory}
                                type="Subcategoría*"
                            />
                            <CustomDataList
                                data={claseData}
                                onSelect={handleClase}
                                disabled={!clase}
                                type="Producto*"
                            />
                        </div>
                        <h2 className={styles.terms}>Al continuar, confirmo que conozco y acepto los <span onClick={() => setTerms(true)}>términos</span> y <span onClick={() => setPolicies(true)}>políticas</span>.</h2>
                    </div>
                }

                {delivery &&
                    <>
                        <h1 className={styles.title}>¿Quieres entregar tu paquete en esta tienda?</h1>
                        <div className={styles.cardContainer}>
                            {deliveryTypes.map((delivery, idx) => {
                                return <Card type="delivery" content={delivery} key={idx} onClick={defineDelivery} block={block} setBlock={setBlock} />
                            })}
                        </div>
                    </>
                }

                {confirmData &&
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
                }

                <div className={styles.buttonContainer}>
                    <Button text="Regresar" width="132px" color="outlined" onClick={() => handleBack()} />
                    {formSender && <Button2 text="Continuar" width='132px' canContinue={Object.keys(senderData).length !== 0} handleContinue={handleFormSender} />}
                    {formReceiver && <Button2 text="Continuar" width='132px' canContinue={Object.keys(receiverData).length !== 0} handleContinue={handleFormReceiver} />}
                    {(category || subcategory || clase) && <Button2 text="Continuar" width='132px' canContinue={classCodeCtx !== ""} handleContinue={handleContinueCategory} />}
                    {confirmData && <Button2 text="Imprimir guía" width='172px' canContinue={true} handleContinue={handlePrint} />}
                </div>
                {(terms || policies) && <Terms handleClose={() => handleCloseTerms()} width="1000px" height={'656px'} type={terms ? "terms" : "policies"} />}
            </div>
        </FlowBackground>
    )
}

export default DefineParams;