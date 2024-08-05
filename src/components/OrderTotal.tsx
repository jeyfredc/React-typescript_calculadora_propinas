import { Dispatch, useMemo } from 'react';
import {  OrderItem } from '../types/index';
import { formatCurrency } from '../helpers';
import { OrderActions, OrderState } from '../reducers/order-reducer';

type OrderTotalProps = {
    order :  OrderState['order']
    tip: OrderState['tip']
    dispatch: Dispatch<OrderActions>
}

export default function OrderTotal({order, tip, dispatch}: OrderTotalProps) {

    const subtotalAmount = useMemo(() => order.reduce((total,item)=> total + (item.quantity * item.price),0) , [order])
    const tipAmount = useMemo(() => subtotalAmount * tip , [tip,order])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount , [tip,order])

  return (
    <>
      <div className="space-y-3">
      <button className="font-black text-2xl">Totales y propina</button>
      <p>
        Subtotal a pagar:{' '}
        <span className="font-bold">{formatCurrency(subtotalAmount)}</span>{" "}
      </p>

      <p>
        Propina:{' '}
        <span className="font-bold">{formatCurrency(tipAmount)}</span>{" "}
      </p>

      <p>
        Total a pagar:{' '}
        <span className="font-bold">{formatCurrency(totalAmount)}</span>{" "}
      </p>
      </div>

      <button className='w-full bg-black p-3 uppercase text-white mt-10 disabled:opacity-10' disabled={totalAmount===0}
      onClick={()=>dispatch({type:'clean-order'})}>
        Guardar orden
      </button>
    </>
  );
}
