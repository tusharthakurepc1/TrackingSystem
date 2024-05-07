import { useState } from 'react';
import LoginOrganizationUserForm from '../../organisms/OrganizationUserLoginSignup/LoginOrganizationUserForm';
import SignupOrganizationUserForm from '../../organisms/OrganizationUserLoginSignup/SignupOrganizationUserForm';

const OrganizationUser = () => {
    const [loginFlag, setLoginFlag] = useState(true)
    const setLogin = (value: boolean) => {
        setLoginFlag(value)
    }

    return( 
        <div className='organization-user-form'>
            {
                loginFlag ? <LoginOrganizationUserForm setLogin={setLogin}/>
                : <SignupOrganizationUserForm setLogin={setLogin}/>
            }

        </div>
    )
}

export default OrganizationUser;
