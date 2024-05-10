import { useState } from "react";
import LoginSystemUserForm from "../../organisms/SystemUserLoginSignup/LoginSystemUserForm";
import SignupSystemUserForm from "../../organisms/SystemUserLoginSignup/SignupSystemUserForm";
import CustomNavbar from "../../molecules/Header/Header";

const SystemUser = () => {
  const [loginFlag, setLoginFlag] = useState(true);
  const setLogin = (value: boolean) => {
    setLoginFlag(value);
  };

  return (
    <div>
      <CustomNavbar isVisible={false}/>
      {loginFlag ? (
        <LoginSystemUserForm loginFlag={loginFlag} setLogin={setLogin} />
      ) : (
        <SignupSystemUserForm loginFlag={loginFlag} setLogin={setLogin} />
      )}
    </div>
  );
};

export default SystemUser;
