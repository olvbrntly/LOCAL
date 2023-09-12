import Header from './components/Header'
import Footer from './components/Footer';
import { BrowserRouter as  Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/Homepage'
import About from './components/About'

const  App  =() => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
