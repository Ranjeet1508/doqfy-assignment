import { Route, Switch, Routes} from 'react-router-dom';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import AdminFeeUpdate from './Pages/AdminFeeUpdate';


function App() {
  return (
    <>
      <Routes>
        <Route path='/signup-page' element={<SignupPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/fee-structure' element={<AdminFeeUpdate />} />
      </Routes>
    </>
  );
}

export default App;
