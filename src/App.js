import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Navigation from './components/navigation';
import Home from './components/home';
import Register from './components/user/register';
import Camera from "./components/camera/camera"
import loginPage from "./components/user/login";
import profile from "./components/user/profile";
import addJob from "./components/user/addJob";
import './components/css/AppMain.css'

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
                    <Route path="/login" component={loginPage} exact/>
                    <Route path="/register" component={Register} exact/>
                    <Route path="/camera" component={Camera} exact/>
                    <Route path="/profile" component={profile} exact/>
                    <Route path="/addJob" component={addJob} exact />
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default App;
