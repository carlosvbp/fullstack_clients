import { useContext } from "react"
import { AuthContext } from "../../../providers/Context"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../../Modal"
import { EditContactForm } from "../../../interfaces/modal.interface"
import { editContactSchema } from "./editContactSchema"
import { Contact } from "../../../interfaces/contacts.interface"


interface ModalProps {
    toggleModal: () => void
    contact: Contact
}

export const EditContactModal = ({ toggleModal, contact }: ModalProps) => {
    const { editContact } = useContext(AuthContext)

    const { register, handleSubmit } = useForm<EditContactForm>({
        resolver: zodResolver(editContactSchema)
    })

    const submit = async (FormData: EditContactForm) => {
        try {
            await editContact(FormData, contact.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal toggleModal={toggleModal} blockClosing>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="fullname">Novo nome</label>
                <input defaultValue={contact.fullname} type="text" id="fullname" {...register("fullname")} />
                <label htmlFor="email">Novo E-mail</label>
                <input defaultValue={contact.email} type="email" id="email" {...register("email")} />
                <label htmlFor="phone">Novo Telefone</label>
                <input defaultValue={contact.phone} type="text" id="phone" {...register("phone")} />
                <button type="submit">Salvar alterações</button>
            </form>
        </Modal>
    )
}