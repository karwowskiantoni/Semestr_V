import React, {useState} from "react";
import {Bar} from "./Components/Navigation/Bar";
import {ToastContainer} from "react-bootstrap";
import {WarningModal} from "./Components/Modals/WarningModal";
import {CustomToast} from "./Components/Modals/CustomToast";
import {OrderTable} from "./Components/Tables/OrderTable";
import {OrderForm} from "./Components/AddPanels/OrderForm";

export function OrderPage({selectedProducts, setSelectedProducts}) {
    const [toast, setToast] = useState({open: false, message: ""});
    const [warningModal, setWarningModal] = useState({open: false, message: ""});
    const URL = "http://localhost:3000"

    return (
        <div style={{backgroundColor: "#FFFFFF", padding: 100}}>
            <Bar size={selectedProducts.length}/>
            <WarningModal info={warningModal} setInfo={setWarningModal}/>
            <ToastContainer position={'top-end'}>
                <CustomToast info={toast}
                             setInfo={setToast}/>
            </ToastContainer>
            <OrderTable
                products={selectedProducts}
                setProducts={setSelectedProducts}
            />
            <OrderForm products={selectedProducts} URL={URL} setWarningModal={setWarningModal} setToast={setToast}/>
        </div>
    );
}
