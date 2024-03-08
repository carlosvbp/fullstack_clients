import { ReactNode, createContext, useEffect, useState } from "react"
import { loginSchema } from "../pages/LoginPage/loginSchema"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import { toast } from "react-toastify"
import { Customer } from "../interfaces/customer.interface"
import { Contact } from "../interfaces/contacts.interface"
import { EditContactForm } from "../interfaces/modal.interface"

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextValues {
    logIn: (data: loginSchema) => void
    loading: boolean
    customer: Customer
    contacts: Contact[]
    modalEditIsOpen: any
    setModalEditIsOpen: any
    editingContacts: any
    setEditingContacts: any
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
    customerRegister: (FormData: Customer) => Promise<void>;
    editContact: (formData: EditContactForm, contactId: number) => Promise<void>;
    deleteContact: (contactId: number) => void;
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({} as Customer)
    const [contacts, setContacts] = useState([] as Contact[])
    const [loading, setLoading] = useState(true)

    const [editingContacts, setEditingContacts] = useState(null)
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

    const token = localStorage.getItem("@your-todolist:token")

    useEffect(() => {
        const getCustomerData = async () => {
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            setLoading(true)
            try {
                setLoading(true)
                const { data } = await api.get("/customers")
                setCustomer(data)
                setContacts(data.contacts)
                setLoading(false)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        if (token) {
            getCustomerData()
        }
    }, [])

    const customerRegister = async (formData: Customer) => {
        try {
            setLoading(true)
            await api.post("/customers", formData)
            toast.success("Cadastro realizado")
            navigate("/")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const logIn = async (
        formData: loginSchema,
    ) => {
        try {
            setLoading(true)
            const { data } = await api.post("/login", formData)
            api.defaults.headers.common.authorization = `Bearer ${data.token}`;
            localStorage.setItem('@your-todolist:token', data.token);
            localStorage.setItem('@customer-id', data.id);
            navigate("/dashboard");
            window.location.reload()
        } catch (err) {
            console.error(err)
            toast.error("Email ou senha inválidos")
        } finally {
            setLoading(false);
        }
    }

    const editContact = async (formData: EditContactForm, contactId: number): Promise<void> => {
        console.log(contactId)
        try {
            const { data } = await api.patch(`/contacts/${contactId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const newContactList = contacts.map(contact => {
                if (contact.id === contactId) {
                    return data
                } else {
                    return contact
                }
            })
            setContacts(newContactList)
            setModalEditIsOpen(false)
            toast.success("Contato editado com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Não foi possível editar o contato")
        }
    }

    const deleteContact = async (contactId: number) => {
        try {
            await api.delete(`/contacts/${contactId}`);
            toast.success("Contato excluído com sucesso!");
            setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== contactId));
        } catch (error) {
            console.log("Erro ao excluir o contato:", error)
            toast.error("Erro ao excluir o contato. Tente novamente.");
        }
    }

    return (
        <AuthContext.Provider value={{
            logIn,
            loading,
            customer,
            contacts,
            setContacts,
            setCustomer,
            customerRegister,
            deleteContact,
            editingContacts,
            editContact,
            setEditingContacts,
            modalEditIsOpen,
            setModalEditIsOpen
        }}>
            {children}
        </AuthContext.Provider>
    )
}


