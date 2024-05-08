
import "rsuite/dist/rsuite.min.css";
import { useState } from "react";
import { Nav } from "rsuite";
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useNavigate } from "react-router-dom";
import './style.scss'

const CustomNavbar = ({onSelect}: CustomNavbarProps) => {
    const navigate = useNavigate()
    const [active, setActive] = useState('home');

    return (
    <Nav  activeKey={active} onSelect={onSelect} style={{margin: 10}}>

      <Nav.Item eventKey="home" icon={<HomeIcon />} onClick={()=>{navigate("/")}}>
        WFH
      </Nav.Item>
      
    </Nav>
    );
};

export default CustomNavbar