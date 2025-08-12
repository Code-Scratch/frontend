import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './rooting/AppRouter';

function App() {
  return (
        <>
            <RouterProvider router={AppRouter}></RouterProvider>
        </>
  )
}

export default App
