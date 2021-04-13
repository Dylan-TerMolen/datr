import { useHistory } from 'react-router';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink
} from 'reactstrap';

export default function UserNavbar (props){
  const history = useHistory()
  const handleLogout = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout_user`, {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("datrToken")}`
      }
  })
      .then(res => res.json())
      .then(result => {
        history.push("/")
        localStorage.removeItem("datrToken")
  })  
  }
  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand className="text-danger" href="/">Home</NavbarBrand>
        <Nav className="mr-auto" navbar>
            <NavItem>
                <Button className="text-danger bg-transparent border border-danger rounded mr-3" onClick={handleLogout}>Logout</Button>
            </NavItem>
            <NavItem>
                <NavLink className="text-danger border border-danger rounded mr-3" href="/user/saved">Saved Ideas</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="text-danger border border-danger rounded mr-3" href="/user/new">Get New Ideas</NavLink>
            </NavItem>
        </Nav>
        {props.username !== null && <NavbarBrand className="text-danger ml-6">{`Hello, ${props.username}!`}</NavbarBrand>}
        <NavbarBrand>
            <img width="60" height="60" className="d-inline-block align-top" src="/datrlogo.png" alt="Datr Logo"></img>
        </NavbarBrand>
      </Navbar>
    </div>
  );
}