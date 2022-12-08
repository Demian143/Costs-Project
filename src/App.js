import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Company from './pages/Company';
import NewProject from './pages/NewProject';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/contact'}>Contact</Link>
        <Link to={'/company'}>Company</Link>
        <Link to={'/newproject'}>NewProject</Link>
      </div>
      <Container customClass="min-height">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/newproject' element={<NewProject />} />
          <Route exact path='/company' element={<Company />} />
        </Routes>
      </Container>
      <footer>Footer</footer>
    </Router>
  );
}

export default App;
