import { useNavigate } from "react-router-dom"
import { Modal } from "../../Modal"

interface ModalProps {
    toggleModal: () => void
}

export const ModalError = ({ toggleModal }: ModalProps) => {
    const navigate = useNavigate()
    const handleClick = () => {
        toggleModal()
        navigate("/")
    }

    return (
        <Modal toggleModal={toggleModal} blockClosing>
            Você não está autenticado !!!
            <button onClick={handleClick}>Ir para o Login</button>
        </Modal>
    )
}

