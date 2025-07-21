import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;