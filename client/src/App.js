import Header from './components/Header'
import { BrowserRouter as  Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/Homepage'

const  App  =() => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='Homepage' element={<Homepage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
