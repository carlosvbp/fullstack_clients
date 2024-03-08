import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./providers/Context"
import { RoutesMain } from "./routes"
import Global from "./styles/global"
import 'react-toastify/dist/ReactToastify.css';
import { AxiosInterceptor } from "./components/AxiosInterceptor";

function App() {
  return (
    <>
      <AxiosInterceptor>
        <AuthProvider>
          <ToastContainer autoClose={4 * 1000} />
          <Global />
          <RoutesMain />
        </AuthProvider>
      </AxiosInterceptor>
    </>
  )
}

export default App
