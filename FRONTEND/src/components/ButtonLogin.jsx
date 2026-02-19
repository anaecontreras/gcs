import './ButtonLogin.css'

function ButtonLogin({ tipo, texto, btnType, haceClick }) {
    return (
        <button
            className={`btn-${btnType}`}
            type={tipo}
            onClick={haceClick}
        >
            {texto}
        </button>
    )
}

export default ButtonLogin