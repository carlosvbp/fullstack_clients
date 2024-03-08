import { ContactService } from "../services/contacts.service";
import { CustomerService } from "../services/customers.service";
import { LoginService } from "../services/login.service";
import { ContactController } from "./contacts.controller";
import { CustomerController } from "./customers.controller";
import { LoginController } from "./login.controller";


const contactService = new ContactService()
const contactController = new ContactController(contactService)
const customerService = new CustomerService()
const customerController = new CustomerController(customerService)
const loginService = new LoginService()
const loginController = new LoginController(loginService)


export { customerController, contactController, loginController }

