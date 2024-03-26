import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as  Router, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './components/Homepage'
import About from './components/About';
import Terms from './components/Terms';
import Contact from './components/Contact';
import BusinessesList from './features/Business/BusinessesList';
import AddBusinessForm from './features/Admin/AddBusinessForm';
import AdminBusinessList from './features/Admin/AdminBusinessList';
// import EditBusinessForm from './features/Admin/EditBusinessForm';
import AdminHome from './features/Admin/AdminHome';
import EditBusiness from './features/Admin/EditBusiness';
import Prefetch from './features/auth/Prefetch';
import BusinessInfoPage from './features/Business/BusinessInfoPage';
import BusinessListByZip from './features/Business/BusinessListByZip';

const  App  =() => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
         
        {/* Homepage */}
          <Route path='/' element={<Layout/>}/>
          <Route index element={<Homepage />} />
        {/* Footer Routes */}
          <Route path='/about' element={<About/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/contact' element={<Contact/>}/>

        {/* User Routes */}
        <Route element={<Prefetch />}>
          <Route path='/business' element={<BusinessesList/>}/>
          <Route path='/business/:id' element={<BusinessInfoPage/>}/>
          <Route path='/business/zipcode/:zipCode' element={<BusinessListByZip/>}/>
     
        </Route>

        <Route element={<Prefetch />}>
        {/* Admin Routes */}
          <Route path='/admin'>

            <Route index element={<AdminHome/>}/>
            <Route path='businesses' element={<AdminBusinessList/>}/>

            <Route path='business'>
            
              <Route path='create' element={<AddBusinessForm/>}/>
              <Route path=':id' element={<BusinessInfoPage/>}/>
              <Route path='edit/:id' element={<EditBusiness/>}/>
              
            </Route>
        </Route>
           
          </Route>
      

        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
