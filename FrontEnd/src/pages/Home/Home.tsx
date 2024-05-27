import { useNavigate } from "react-router-dom";
import { Button, Divider } from "rsuite";
import CustomNavbar from "../../molecules/Header/Header";
import "./Home.style.scss";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();

  useEffect(()=> {  
    const token: string | undefined = Cookies.get("accessToken");
    const user: string | undefined = Cookies.get("user")
    

    if(user === 'SYS' && token){
      navigate("/sysuser-dashboard")
    }
    if(user === 'ORG' && token){
      navigate("/user-dashboard")
    }
        

  }, [])

  return (
    <div className="home-container">
      <CustomNavbar isVisible={false}/>
      <h3 className="home-heading">Welcome Back!</h3>
      <div className="form-body">
        <div className="form-buttons">
          <strong>Want to Login Signup as a </strong>
          <Button
            onClick={() => navigate("/user-login")}
            appearance="primary"
            active
            className="button"
          >
            Organization User
          </Button>
          <Divider vertical className="divider" />
          <strong>Want to Login Signup as a </strong>
          <Button
            onClick={() => navigate("/sysuser-login")}
            appearance="primary"
            active
            className="button"
          >
            System User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
