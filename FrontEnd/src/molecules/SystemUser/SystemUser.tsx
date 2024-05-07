import { useState } from 'react';
import LoginSystemUserForm from '../../organisms/SystemUserLoginSignup/LoginSystemUserForm';
import SignupSystemUserForm from '../../organisms/SystemUserLoginSignup/SignupSystemUserForm';

const SystemUser = () => {
    const [loginFlag, setLoginFlag] = useState(true)
    const setLogin = (value: boolean) => {
        setLoginFlag(value)
    }

    return( 
        <div>
            {
                loginFlag ? <LoginSystemUserForm setLogin={setLogin}/>
                : <SignupSystemUserForm setLogin={setLogin}/>
            }
        </div>
    )
}

export default SystemUser;
