import { Dispatch, SetStateAction } from "react"
import { Contact } from "../../../interfaces/contacts.interface"
import { Modal } from "../../Modal"
import { useForm } from "react-hook-form"
import { contactSchema, schema } from "./contactSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../../services/api"

interface ModalProps {
    toggleModal: () => void
    setContacts: Dispatch<SetStateAction<Contact[]>>
}

export const ModalAddContact = ({toggleModal, setContacts}: ModalProps) => {
    const { register, handleSubmit } = useForm<contactSchema>({
        resolver: zodResolver(schema)
    })

    const createContact = async (data: contactSchema) => {
        const token = localStorage.getItem("@your-todolist:token")
        const response = await api.post<Contact>("/contacts", {...data}, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        setContacts(previusContacts => [ ...previusContacts, response.data])
        toggleModal()
    }

    return (
        <Modal toggleModal={toggleModal}>
            <form onSubmit={handleSubmit(createContact)}>
                <label htmlFor="fullname">Nome completo</label>
                <input type="text" id="fullname" {...register("fullname")}/>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register("email")}/>
                <label htmlFor="phone">Telefone</label>
                <input type="text" id="phone" {...register("phone")}/>
                <button type="submit">Cadastrar</button>
            </form>
        </Modal>
    )
}