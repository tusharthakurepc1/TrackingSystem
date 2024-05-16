import { useNavigate } from "react-router-dom";
import { Button, Divider } from "rsuite";
import CustomNavbar from "../../molecules/Header/Header";
import "./Home.style.scss";

const Home = () => {
  const navigate = useNavigate();
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
