import { Switch, Route, Redirect } from 'react-router-dom';

// importing components
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';

// importing routes
import AdminRoute from '../components/Routes/AdminRoute'; // routes that you can access only if admin
import PrivateRoute from '../components/Routes/PrivateRoute'; // routes that you can access only if logged in
import PublicRoute from '../components/Routes/PublicRoute'; // routes that you can access only if logged out

// importing containers
import ForgotPassword from '../containers/ForgotPassword';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Logout from '../containers/Logout';
import MyProfile from './MyProfile';
import ResetPassword from '../containers/ResetPassword';
import Signup from '../containers/Signup';
import SignUpConfirmation from '../containers/SignUpConfirmation';
import Users from '../containers/Users';

const Layout = () => {
  return (
    <div className="layout">
      <Menu />

      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>

        {/* normal routes */}
        <Route exact path="/Home" component={Home} />

        {/* public routes */}
        <PublicRoute exact path="/Login" component={Login} />
        <PublicRoute exact path="/Signup" component={Signup} />
        <PublicRoute
          exact
          path={'/ForgotPassword'}
          component={ForgotPassword}
        />
        <PublicRoute
          path={'/SignUpConfirmation/:confirmationToken'}
          component={SignUpConfirmation}
        />
        <PublicRoute
          exact
          path={'/ResetPassword/:resetToken'}
          component={ResetPassword}
        />

        {/* private routes */}
        <PrivateRoute path="/MyProfile" component={MyProfile} />
        <PrivateRoute exact path="/Logout" component={Logout} />

        {/* admin routes */}
        <AdminRoute exact path="/Users" component={Users} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Layout;
