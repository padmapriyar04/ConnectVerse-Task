import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import Terms from './components/terms';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Main></Main>
  },
  {
    path:'/signup',
    element: <Signup />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path : '/terms',
    element : <Terms />
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
