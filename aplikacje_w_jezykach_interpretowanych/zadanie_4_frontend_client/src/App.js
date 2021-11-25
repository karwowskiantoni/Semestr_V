import "bootstrap/dist/css/bootstrap.min.css";
import {ProductPage} from "./ProductPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {OrderPage} from "./OrderPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/order">
                    <OrderPage/>
                </Route>
                <Route path="/store">
                    <ProductPage/>
                </Route>
                <Route path={"/"}>
                    <ProductPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
