import "rsuite/dist/rsuite.min.css";
import { Navbar, Nav, Avatar, Dropdown } from "rsuite";
import { FaUserLarge } from "react-icons/fa6";
import HomeIcon from "@rsuite/icons/legacy/Home";
import { useNavigate } from "react-router-dom";
import "./Header.style.scss";

const CustomNavbar = ({ isVisible }: CustomNavbarProps) => {
  // const colors=["red", "green", "blue", "orange", "yellow"]
  // const getRandomColor = () => {
  //   return colors[Math.floor(Math.random()* 6)]
  // }
  // const color = getRandomColor()

  const navigate = useNavigate();

  const profileClick = () => {
    navigate("/profile")
  };

  const logoutClick = () => {
    console.log("Logout");
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
