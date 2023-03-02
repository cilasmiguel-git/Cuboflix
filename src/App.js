import './App.scss';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';

import { BrowserRouter} from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Generalroutes from './config/Generalroutes';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Generalroutes/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
