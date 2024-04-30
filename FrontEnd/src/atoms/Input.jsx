import React from 'react'

const Input = ({type, content, name, setValue}) => {
    if(type === 'text' || type === 'password' || type === 'email'){
        return <input onChange={setValue} className='custom-input' type={type} name={name} placeholder={content} ></input>
    }
    else if(type === 'submit' || type === 'button'){
        return <input onChange={setValue} className='custom-input' type={type} name={name} value={content} ></input>
    }
    else if(type === 'date'){
        return<>
            <br />
            <strong>{content}</strong>
            <br />
            <input onChange={setValue} className='custom-input' type={type} name={name} />
        </> 
    }
    return <input></input>
}

export default Input