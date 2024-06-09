import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import DeliveryProvider from './context/DeliveryProvider';
import OrderProvider from './context/OrderProvider';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import PosHome from './Pages/PosHome';
import Items from './Pages/Items';
import FoodDetailScreen from './Pages/FoodDetailScreen';
import PlaceOrderScreen from './Pages/PlaceOrder';
import Bill from './Pages/Bill';
import Orders from './Pages/Orders';
import Ingredients from './Pages/Ingredients';
import IngredientDetailScreen from './Pages/IngredientDetailScreen';
import Expenses from './Pages/Expenses';

function App() {

  return (

    <div className='App'>
      <BrowserRouter>
      <AuthProvider>
      <OrderProvider>
          <DeliveryProvider>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/bill/:orderid' element={<Bill />} />
        <Route exact path='/placeorder' element={<PlaceOrderScreen />} />
        <Route exact path='/ingredients' element={<Ingredients />} />
        <Route exact path='/poshome' element={<PosHome />} />
        <Route exact path='/orders' element={<Orders />} />
        <Route exact path='/expenses' element={<Expenses />} />
        <Route exact path='/ingredientdetail/:title' element={<IngredientDetailScreen />} />
        <Route exact path='items/:title' element={<Items />} />
        <Route exact path='fooditem/:title' element={<FoodDetailScreen />} />
      </Routes>
          </DeliveryProvider >
          </OrderProvider >
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;