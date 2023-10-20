import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/createdocket' element={<CreateScreen />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
