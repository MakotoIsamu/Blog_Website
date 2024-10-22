import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import CategoriesPage from './pages/CategoriesPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/blogs' element={<BlogsPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/users' element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
