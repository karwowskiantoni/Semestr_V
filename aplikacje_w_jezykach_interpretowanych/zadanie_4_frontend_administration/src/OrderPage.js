import React, {useEffect, useState} from "react";
import {TableFilter} from "./Components/Tables/TableFilter";
import {Bar} from "./Components/Navigation/Bar";
import {ToastContainer} from "react-bootstrap";
import {WarningModal} from "./Components/Modals/WarningModal";
import {CustomToast} from "./Components/Modals/CustomToast";
import {OrderTable} from "./Components/Tables/OrderTable";
import {OrderEditModal} from "./Components/Modals/OrderEditModal";

export function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [shouldReload, setShouldReload] = useState(0);
    const [toast, setToast] = useState({open: false, message: ""});
    const [warningModal, setWarningModal] = useState({open: false, message: ""});
    const [editModal, setEditModal] = useState({
        open: false, order: {
            "username": "",
            "mail": "",
            "phone": "",
            "confirmDate": "",
            "status": "",
            "id": "",
        }
    });
    const URL = "http://localhost:3000"
    useEffect(() => {
        async function fetchAPI() {
            let response = await fetch(URL + "/orders");
            let json = await response.json();
            setOrders(json);
            setFilteredOrders(json);
        }

        fetchAPI();
    }, [shouldReload]);

    return (
        <div style={{backgroundColor: "#FFFFFF", padding: 100}}>
            <Bar URL={URL}
                 setShouldReload={setShouldReload}
                 size={filteredOrders.length}
                 newProductMode={false}
                 setNewProductMode={() => {
                 }}
            />
            <WarningModal info={warningModal} setInfo={setWarningModal}/>
            <OrderEditModal info={editModal}
                              setInfo={setEditModal}
                              URL={URL}
                              setShouldReload={setShouldReload}
                              setWarningModal={setWarningModal}/>
            <ToastContainer position={'top-end'}>
                <CustomToast info={toast}
                             setInfo={setToast}/>
            </ToastContainer>
            <TableFilter data={orders}
                         setFilteredData={setFilteredOrders}/>
            <OrderTable
                setEditModal={setEditModal}
                orders={filteredOrders}
            />
        </div>
    );
}
