import "bootstrap/dist/css/bootstrap.min.css";
import {ProductPage} from "./ProductPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"}>
                    <ProductPage/>
                </Route>
                <Route path="/store">
                    <ProductPage/>
                </Route>
                <Route path="/order">
                    <ProductPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
