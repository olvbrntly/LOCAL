import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as  Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/Homepage'
import About from './components/About';
import Terms from './components/Terms';
import Contact from './components/Contact';
import BusinessesList from './features/Business/BusinessesList';
import AddBusinessForm from './features/Admin/AddBusinessForm';
import AdminBusinessList from './features/Admin/AdminBusinessList';
import EditBusinessForm from './features/Admin/EditBusinessForm';
import AdminHome from './features/Admin/AdminHome';


const  App  =() => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
         
        {/* Homepage */}
          <Route path='/' element={<Homepage/>}/>

        {/* Footer Routes */}
          <Route path='/about' element={<About/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/contact' element={<Contact/>}/>

        {/* User Routes */}
          <Route path='business' element={<BusinessesList/>}/>

        {/* Admin Routes */}
          <Route path='admin' element={<AdminHome/>}/>
          <Route path='admin/businesses' element={<AdminBusinessList/>}/>
          <Route path='admin/business/create' element={<AddBusinessForm/>}/>
          <Route path='admin/business/:id' element={<EditBusinessForm/>}/>

        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
