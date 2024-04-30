import React from 'react'
import './style.scss'

const Button = ({ onClickRef, content }) => {
    return (
        <button className="custom-btn" onClick={onClickRef} >{content}</button>
    )
}

export default Button
