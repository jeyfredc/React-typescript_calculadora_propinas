import { Dispatch, SetStateAction } from "react";
import { OrderActions, OrderState } from "../reducers/order-reducer";

const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];

type TipPercentajeFormProps= {
    dispatch: Dispatch<OrderActions>
    tip: OrderState['tip']
}

export default function TipPercentajeForm({dispatch, tip}:TipPercentajeFormProps) {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina:</h3>
      <form>
        <div>
          {tipOptions.map((tipOption) => {
            return (
              <div key={tipOption.id} className="flex gap-2">
                <label htmlFor={tipOption.id}>{tipOption.label}</label>
                <input id={tipOption.id} type="radio" name="tip" value={tipOption.value} onChange={ e => dispatch({type:'add-tip',payload:{value:tipOption.value} } )}
                checked={tipOption.value === tip}
                />
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
