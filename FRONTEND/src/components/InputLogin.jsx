import { ImgUser, ImgPassword } from '../services/Icons';

function InputLogin({ Imagen, tipo, place, val, change }) {
    return (
        <>
            <div className="group-login">
                < Imagen />

                <input
                    type={tipo}
                    autoComplete='off'
                    className="login-input"
                    placeholder={place}
                    value={val}
                    onChange={change}
                />
            </div>

        </>

    )
}

export default InputLogin