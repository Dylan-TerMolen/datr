import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default function HomeNavbar (){
  return (
    <div>
      <Navbar className="bg-white" expand="md">
        <NavbarBrand className="text-danger" href="/">Home</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink className="text-danger border border-danger rounded mr-3" href="/user/saved">User Page</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-danger border border-danger rounded mr-3" href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-danger border border-danger rounded" href="/register">Register</NavLink>
          </NavItem>
        </Nav>
        <NavbarBrand>
            <img width="60" height="60" className="d-inline-block align-top" src="/datrlogo.png" alt="Datr Logo"></img>
        </NavbarBrand>
      </Navbar>
    </div>
  );
}