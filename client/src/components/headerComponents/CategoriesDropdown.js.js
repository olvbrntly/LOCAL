
import NavDropdown from 'react-bootstrap/NavDropdown';
function CategoriesDropdown() {
  return (
    <NavDropdown title="Categories" id="basic-nav-dropdown">
    <NavDropdown.Item href='http://localhost:3000/business'>All Businesses</NavDropdown.Item>
    <NavDropdown.Divider />
    
  </NavDropdown>
  );
}

export default CategoriesDropdown;