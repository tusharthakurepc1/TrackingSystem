import React, { useState } from 'react';
import Button from '../atoms/Button';
import LoginSystemUserForm from '../organisms/LoginSystemUserForm';
import SignupSystemUserForm from '../organisms/SignupSystemUserForm';

const SystemUser = () => {
    const [loginFlag, setLoginFlag] = useState(true)
    return( 
        <div className='system-user-form'>
            <Button content={"Login"} onClickRef={()=> setLoginFlag(true)}/>
            <Button content={"Signup"} onClickRef={()=> setLoginFlag(false)}/>

            {
                loginFlag ? <LoginSystemUserForm />
                : <SignupSystemUserForm/>
            }

        </div>
    )
}

export default SystemUser;
