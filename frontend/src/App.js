import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './store/contexts/AuthContext';

import Layout from './Layout/Layout';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
