//module
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Avatar, Dropdown } from "rsuite";
import { FaUserLarge } from "react-icons/fa6";

//css
import HomeIcon from "@rsuite/icons/legacy/Home";
import "rsuite/dist/rsuite.min.css";
import "./HeaderSystemUser.style.scss";

//type
import {CustomNavbarProps} from './HeaderSystemUser.type'

const CustomNavbar = ({ isVisible }: CustomNavbarProps) => {

  const navigate = useNavigate();

  const profileClick = () => {
    navigate("/sysprofile")
  };

  const logoutClick = () => {
    Cookies.remove('accessToken');
    navigate("/")
  };

  return (
    <Navbar>
      <Nav activeKey={"home"} >
        <Nav.Item
          eventKey="home"
          icon={<HomeIcon />}
          onClick={() => {
            navigate("/");
          }}
        >
          WFH
        </Nav.Item>
      </Nav>

      {isVisible && (
        <Nav pullRight>
          <Dropdown
            icon={
              <Avatar style={{backgroundColor: "blue"}}>
                <FaUserLarge />
              </Avatar>
            }
          >
            <Dropdown.Item onClick={profileClick}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={logoutClick}>Logout</Dropdown.Item>
          </Dropdown>
        </Nav>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
