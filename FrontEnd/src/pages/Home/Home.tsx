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
            style={{ marginRight: 100, width: 150 }}
          >
            Organization User
          </Button>

          <Divider vertical style={{ height: 300, marginTop: 20 }} />

          <strong style={{ marginLeft: 100 }}>
            Want to Login Signup as a{" "}
          </strong>
          <Button
            onClick={() => navigate("/sysuser-login")}
            appearance="primary"
            active
            style={{ width: 150 }}
          >
            System User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
