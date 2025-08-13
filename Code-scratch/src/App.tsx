import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './rooting/AppRouter';
import { UserContextProvider } from './context/UserContextProvider';

function App() {
  return (
        <>
        <UserContextProvider>
            <RouterProvider router={AppRouter}></RouterProvider>
        </UserContextProvider>
        </>
  )
}

export default App
