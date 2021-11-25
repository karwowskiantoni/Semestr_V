import "bootstrap/dist/css/bootstrap.min.css";
import {ProductPage} from "./ProductPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {OrderPage} from "./OrderPage";
import {useState} from "react";

function App() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/order">
                    <OrderPage selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
                </Route>
                <Route path="/store">
                    <ProductPage selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
                </Route>
                <Route path={"/"}>
                    <ProductPage selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
