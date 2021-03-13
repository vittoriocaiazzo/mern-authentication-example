import { Switch, Route, Redirect } from 'react-router-dom';

// importing components
import MenuAccount from '../components/MenuAccount/MenuAccount';

// importing routes
import PrivateRoute from '../components/Routes/PrivateRoute';

// importing containers
import MyPersonalData from '../containers/MyPersonalData';
import DeleteAccount from '../containers/DeleteAccount';

const MyProfile = () => {
  return (
    <div className="my-profile">
      <MenuAccount />

      {/* subrouting */}
      <Switch>
        <Route exact path="/MyProfile">
          <Redirect to="/MyProfile/MyPersonalData" />
        </Route>

        {/* private routes */}
        <PrivateRoute
          exact
          path="/MyProfile/MyPersonalData"
          component={MyPersonalData}
        />

        <PrivateRoute
          exact
          path="/MyProfile/DeleteAccount"
          component={DeleteAccount}
        />
      </Switch>
    </div>
  );
};

export default MyProfile;
