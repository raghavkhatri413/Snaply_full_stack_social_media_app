import {Routes,Route} from 'react-router-dom';
import SigninForm from './_auth/Form/SigninForm';
import SignupForm from './_auth/Form/SignupForm';
import {Home} from './_root/pages';
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* Public routes */}
            <Route element={<AuthLayout/>}>
                <Route path='/sign-in' element={<SigninForm/>} />
                <Route path='/sign-up' element={<SignupForm/>} />
            </Route>

            {/* Private routes */}
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>} />
            </Route>
        </Routes>
    </main>
  )
}

export default App