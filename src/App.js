import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Navigation from './components/navigation';
import Home from './components/home';
import Register from './components/register';
import Login from "./components/login";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Navigation />
        <Switch>
        {/* Add new routes to navigation:
              1. Import component
                    (import Register from './components/register';)
              2. Choose path
                    (/register leads to http://localhost:3000/register)
              3. Add component and path in Route tag
                    (<Route path="/register" component={Register} exact/>)
              4. Add new route to navigation.js
        */}
         <Route path="/" component={Home} exact/>
         <Route path="/login" component={Login} exact />
         <Route path="/register" component={Register} exact/>

       </Switch>
    </div> 
  </BrowserRouter>

  );
}

export default App;
