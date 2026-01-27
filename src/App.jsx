
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import './App.css'
import { Login } from './components/Authentication/Login'
import { SignUp } from './components/Authentication/SignUp'
import HomePage from './components/Home/HomePage'
import ContainerBox from './components/Common/Container-Box'
import AddItemForm from './components/Forms/Add-Item-Form'
import MainTitle from './components/Common/Main-Title'
import Support from './components/Tabs/Support'
import Profile from './components/Tabs/Profile'


function App() {

  return (
    <>
    <ContainerBox>
      <MainTitle/>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="*" element={<HomePage/>}></Route>
        <Route path="/add-item" element={<AddItemForm/>}></Route>
        <Route path="/support" element={<Support/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
      </BrowserRouter>
      <Outlet></Outlet>
    </ContainerBox>
    </>
  )
}

export default App
