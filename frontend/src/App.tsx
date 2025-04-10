import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin';
import { HomePage } from './pages/home';
import { SendMoney } from './pages/sendPage';
import { BrowserRouter , Routes , Route, } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/send" element={<SendMoney/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
