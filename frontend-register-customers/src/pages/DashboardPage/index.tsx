import { useContext, useState } from "react"
import { Board, Container } from "./styles"
import { AuthContext } from "../../providers/Context"
import { ModalAddContact } from "../../components/DashboardModal/ModalAddContact"
import { MdDelete, MdEdit } from "react-icons/md"
import { EditContactModal } from "../../components/DashboardModal/EditContactModal"

export const DashboardPage = () => {
    const {
        customer,
        contacts,
        setContacts,
        deleteContact,
        setModalEditIsOpen,
        modalEditIsOpen,
        setEditingContacts,
    } = useContext(AuthContext)

    const [isOpenModal, setIsOpenModel] = useState(false)

    const toggleModal = () => setIsOpenModel(!isOpenModal)

    const openModal = (event: any) => {
        event.preventDefault()
        setModalEditIsOpen(true)
        setEditingContacts(contacts)
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={toggleModal}>New</button>
            </header>
            {
                isOpenModal && <ModalAddContact toggleModal={toggleModal} setContacts={setContacts} />
            }
            <main>
                <Board>
                    <h2>Cliente</h2>
                    <li>
                        <h3>Nome</h3>
                        <p>{customer.fullname}</p>
                        <h3>E-mail</h3>
                        <p> {customer.email}</p>
                        <h3>Telefone</h3>
                        <p> {customer.phone}</p>
                    </li>
                    <h2>Contatos:</h2>
                    {contacts.map(contact => <li key={contact.id}>
                        <h3>Nome:{contact.fullname} </h3>
                        <h3>Email: {contact.email}</h3>
                        <h3>Telefone: {contact.phone}</h3>
                        <div>
                            <button onClick={openModal} title="Editar contato" aria-label="edit">
                                <MdEdit />
                            </button>
                            {
                                modalEditIsOpen && <EditContactModal toggleModal={toggleModal} contact={contact} />
                            }
                            <button onClick={() => deleteContact(contact.id)} title="Remover contato" aria-label="remove">
                                <MdDelete />
                            </button>
                        </div>
                    </li>)}
                </Board>
            </main>
        </Container>
    )
}                       