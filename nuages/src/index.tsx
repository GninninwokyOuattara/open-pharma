import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import { ChakraProvider } from '@chakra-ui/react';
import { ToastProvider } from './contexts/toast';

import { RouterProvider } from 'react-router-dom';

import { PharmaciesContextProvider } from './contexts/pharmaciesContext';
import { PharmaciesReviewContextProvider } from './contexts/pharmaciesReviewContext';
import appRouting from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastProvider>

        <PharmaciesContextProvider>
          <PharmaciesReviewContextProvider>

            <RouterProvider router={appRouting} />
          </PharmaciesReviewContextProvider>

        </PharmaciesContextProvider>
      </ToastProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
