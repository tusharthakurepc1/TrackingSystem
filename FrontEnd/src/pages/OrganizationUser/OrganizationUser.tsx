import { useState } from "react";
import LoginOrganizationUserForm from "../../organisms/OrganizationUserLoginSignup/LoginOrganizationUserForm";
import SignupOrganizationUserForm from "../../organisms/OrganizationUserLoginSignup/SignupOrganizationUserForm";
import CustomNavbar from "../../molecules/Header/Header";

const OrganizationUser = () => {
  const [loginFlag, setLoginFlag] = useState(true);
  const setLogin = (value: boolean) => {
    setLoginFlag(value);
  };

  return (
    <div className="organization-user-form">
      <CustomNavbar isVisible={false}/>
      {loginFlag ? (
        <LoginOrganizationUserForm setLogin={setLogin} />
      ) : (
        <SignupOrganizationUserForm loginFlag={loginFlag} setLogin={setLogin} />
      )}
    </div>
  );
};

export default OrganizationUser;
