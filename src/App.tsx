import { useReducer } from "react";
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotal from "./components/OrderTotal";
import TipPercentajeForm from "./components/TipPercentajeForm";
import { menuItems } from "./data/db";
import useOrder from "./hooks/useOrder";
import { initialState, orderReducer } from "./reducers/order-reducer";

function App() {
  const { tip, setTip, placeOrder  } = useOrder();

  const [state, dispatch] = useReducer(orderReducer, initialState)


  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">
          Calculadora de propinas
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map((item) => {
              return <MenuItem key={item.id} item={item} 
              dispatch={dispatch}
              />;
            })}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 roundend-lg space-y-10">

          {
            state.order.length >0 ? (
              <>
          <OrderContents
          order={state.order}
          dispatch={dispatch}
          />
          <TipPercentajeForm
          setTip={setTip}
          tip={tip}
          />
          <OrderTotal
          order={state.order}
          tip={tip}
          placeOrder={placeOrder}
          />
              </>
            ):(
              <p className="text-center">La orden esta vacia</p>    
            )
          }

        </div>
      </main>
    </>
  );
}

export default App;
