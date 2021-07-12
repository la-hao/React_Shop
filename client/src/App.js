import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import CartScreen from './screens/CartScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          <Link to="/cart">Cart</Link>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={ProductListScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart" component={CartScreen} />
        </Switch>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
