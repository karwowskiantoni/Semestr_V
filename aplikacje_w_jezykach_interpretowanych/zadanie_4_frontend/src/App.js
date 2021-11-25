import "bootstrap/dist/css/bootstrap.min.css";
import { BookPage } from "./BookPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <BookPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
