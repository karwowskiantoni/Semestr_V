import React, {useEffect, useState} from "react";
import {ProductTable} from "./Components/Tables/ProductTable";
import {TableFilter} from "./Components/Tables/TableFilter";
import {Bar} from "./Components/Navigation/Bar";
import {ToastContainer} from "react-bootstrap";
import {CustomToast} from "./Components/Modals/CustomToast";

export function ProductPage({selectedProducts, setSelectedProducts}) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [toast, setToast] = useState({open: false, message: ""});
    const URL = "http://localhost:3000"
    useEffect(() => {
        async function fetchAPI() {
            let response = await fetch(URL + "/products");
            let json = await response.json();
            setProducts(json);
            setFilteredProducts(json);
        }

        fetchAPI();
    }, []);

    return (
        <div style={{backgroundColor: "#FFFFFF", padding: 100}}>
            <Bar size={selectedProducts.length}/>
            <ToastContainer position={'top-end'}>
                <CustomToast info={toast}
                             setInfo={setToast}/>
            </ToastContainer>
            <TableFilter data={products}
                         setFilteredData={setFilteredProducts}/>
            <ProductTable
                products={filteredProducts}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                setToast={setToast}
            />
        </div>
    );
}
