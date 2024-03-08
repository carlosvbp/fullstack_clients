import { ReactNode } from "react"

export interface ModalProps {
    toggleModal: () => void
    blockClosing?: boolean
    children: ReactNode
}

export interface EditContactForm {
    fullname: string;
    email: string;
    phone: string;
}
