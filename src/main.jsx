import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Comprar from './routes/Comprar.jsx'
import './index.css'
import Footer from './components/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Navbar from './components/Navbar.jsx'
import { Provider } from 'react-redux';
import {store} from './redux/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/comprar/:title' element={<Comprar/>} />
      </Routes>
     
    </BrowserRouter>
     </Provider>
    <Footer/>
  </React.StrictMode>,
)

