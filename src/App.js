import 'antd/dist/antd.min.css'
import { Route, Switch } from "react-router-dom";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "./components/layout/Main";
import Protected from "./components/provider/Protected";
import "./global.css";
import ActiveIngredients from "./pages/ActiveIngredients/ActiveIngredients";
import Brands from "./pages/Brands/Brands";
import Categories from "./pages/Categories/Categories";
import Customers from "./pages/Customers/Customers";
import Dosages from "./pages/Dosages/Dosages";
import Home from "./pages/Home";
import Managers from "./pages/Managers/Managers";
import Nations from "./pages/Nations/Nations";
import PackageCategories from "./pages/PackageCategories/PackageCategories";
import Pharmaceuticals from "./pages/Pharmaceuticals/Pharmaceuticals";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Specifications from "./pages/Specifications/Specifications";
import Tables from "./pages/Tables";
import Tos from "./pages/Tos/Tos";
import DetailPharmaceutical from "./pages/Pharmaceuticals/_components/DetailPharmaceutical";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Protected>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/tos" component={Tos} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/dosages" component={Dosages} />
            <Route exact path="/pharmaceuticals" component={Pharmaceuticals} />
            <Route exact path="/pharmaceuticals/:id" component={DetailPharmaceutical} />
            <Route exact path="/specifications" component={Specifications} />
            <Route exact path="/brands" component={Brands} />
            <Route exact path="/nation" component={Nations} />
            <Route exact path="/categories" component={Categories} />
            <Route
              exact
              path="/package-categories"
              component={PackageCategories}
            />
            <Route
              exact
              path="/active-ingredient"
              component={ActiveIngredients}
            />
            <Route exact path="/profile" component={Profile} />
            {/* <Redirect from="*" to="/dashboard" /> */}
            <Route exact path="/managers" component={Managers} />
            <Route exact path="/customers" component={Customers} />
            <Route
              exact
              path="/package-category"
              component={PackageCategories}
            />
          </Protected>
        </Main>
      </Switch>
    </div>
  );
}

export default App;
