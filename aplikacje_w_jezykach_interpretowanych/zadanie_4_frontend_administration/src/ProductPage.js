import React, {useEffect, useState} from "react";
import {ProductTable} from "./Components/Tables/ProductTable";
import {TableFilter} from "./Components/Tables/TableFilter";
import {Bar} from "./Components/Navigation/Bar";
import {ToastContainer} from "react-bootstrap";
import {CreateProductPanel} from "./Components/AddPanels/CreateProductPanel";
import {WarningModal} from "./Components/Modals/WarningModal";
import {CustomToast} from "./Components/Modals/CustomToast";
import {EditModal} from "./Components/Modals/EditModal";

export function ProductPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [shouldReload, setShouldReload] = useState(0);
    const [newProductMode, setNewProductMode] = useState(false);
    const [toast, setToast] = useState({open: false, message: ""});
    const [warningModal, setWarningModal] = useState({open: false, message: ""});
    const [editModal, setEditModal] = useState({
        open: false, product: {
            "name": "",
            "description": "",
            "price": "",
            "weight": "",
            "category": "",
            "id": "",
        }
    });
    const URL = "http://localhost:3000"
    useEffect(() => {
        async function fetchAPI() {
            let response = await fetch(URL + "/products");
            let json = await response.json();
            setProducts(json);
            setFilteredProducts(json);
        }

        fetchAPI();
    }, [shouldReload]);

    return (
        <div style={{backgroundColor: "#FFFFFF", padding: 100}}>
            <Bar URL={URL}
                 setShouldReload={setShouldReload}
                 size={filteredProducts.length}
                 newProductMode={newProductMode}
                 setNewProductMode={setNewProductMode}
            />
            <WarningModal info={warningModal} setInfo={setWarningModal}/>
            <EditModal info={editModal}
                       setInfo={setEditModal}
                       URL={URL}
                       setShouldReload={setShouldReload}
                       setWarningModal={setWarningModal}/>
            <ToastContainer position={'top-end'}>
                <CustomToast info={toast}
                             setInfo={setToast}/>
            </ToastContainer>
            <CreateProductPanel URL={URL}
                                setShouldReload={setShouldReload}
                                editMode={newProductMode}
                                setWarningModal={setWarningModal}
                                books={products}
                                setToast={setToast}/>
            <TableFilter data={products}
                         setFilteredData={setFilteredProducts}/>
            <ProductTable
                setEditModal={setEditModal}
                products={filteredProducts}
            />
        </div>
    );
}
