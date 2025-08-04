// ❌ This will break if not inside a <BrowserRouter>
import { useRoutes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import StudentsPage from '../features/students/StudentPage';
// import StudentPage from '../pages/StudentPage';

const AppRoutes = () => {
    const routes = useRoutes([
      { path: '/', element: <LoginPage /> },
      { path: '/students', element: <StudentsPage /> },
    ]);
    return routes;
  };
  

export default AppRoutes;
