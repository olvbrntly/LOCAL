import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as  Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/Homepage'
import About from './components/About';
import Terms from './components/Terms';
import Contact from './components/Contact';
import BusinessesList from './features/Business/BusinessesList';

const  App  =() => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/contact' element={<Contact/>}/>

          <Route path='businesses' element={<BusinessesList/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
