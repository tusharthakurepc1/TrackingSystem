import React, { useState } from 'react';
import Button from '../atoms/Button';
import LoginOrganizationUserForm from '../organisms/LoginOrganizationUserForm';
import SignupOrganizationUserForm from '../organisms/SignupOrganizationUserForm';

const OrganizationUser = () => {
    const [loginFlag, setLoginFlag] = useState(true)
    return( 
        <div className='organization-user-form'>
            <Button content={"Login"} onClickRef={()=> setLoginFlag(true)}/>
            <Button content={"Signup"} onClickRef={()=> setLoginFlag(false)}/>

            {
                loginFlag ? <LoginOrganizationUserForm />
                : <SignupOrganizationUserForm />
            }

        </div>
    )
}

export default OrganizationUser;
