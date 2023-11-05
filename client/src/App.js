import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Layout from './Layout'
import axios from 'axios'
import RecipeList from './Pages/RecipeList'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route path='/recipe' element={<RecipeList query={''} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
