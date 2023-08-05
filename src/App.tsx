import './App.css'
import './fonts/Raleway.ttf'
import './fonts/Inconsolata.ttf'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import RootLayout from './layout/RootLayout'
import Home from './app/home/HeroPage'
import Login from './app/auth/Login'
import Register from './app/auth/Register'
import NotFound from './app/misc/NotFound'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			}
		]
	},
	
			{
				path: '/auth/login',
				element: <Login />
			},
			{
				path: '/auth/register',
				element: <Register />
			},
			{
				path: "*",
				element: <NotFound />
			}
])

function App() {

  return (
    <div style={{background:'#E6E7EB'}}>
    <RouterProvider 
				router={router}
			/>
     </div>
  )
}

export default App
