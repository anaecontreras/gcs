import React from 'react'

function InputLogin({ tipo, place, val, change }) {
    return (
        <input
            type={tipo}
            autoComplete='off'
            className="login-input"
            placeholder={place}
            value={val}
            onChange={change}
        />
    )
}

export default InputLogin