import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
<<<<<<< HEAD
=======
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './app/store';
import SearchBar from './components/SearchBar';
>>>>>>> bd419d78b73322b2fa6d05b1a8366b9cc74fddf2

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="app-container">
        <Navbar/>
        <AppRoutes />
      </div>
    </Router>
=======
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <SearchBar />
        <main className="min-h-screen">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
>>>>>>> bd419d78b73322b2fa6d05b1a8366b9cc74fddf2
  );
}

export default App;