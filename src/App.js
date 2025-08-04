import logo from './logo.svg';
import './App.css';
// import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes/Route';
import store from './store/Store';

function App() {
  return (
<Provider store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
  );
}

export default App;
