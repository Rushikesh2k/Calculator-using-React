import { ACTIONS } from "./App"

export default function Operationbutton({dispatch, operation}){// we take dispatch so that we can call reducer fun from app js
    return <button  onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
        
        {operation}</button>

}