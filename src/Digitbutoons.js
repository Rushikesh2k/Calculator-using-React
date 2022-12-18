import { ACTIONS } from "./App"

export default function Digitbutton({dispatch, digit}){// we take dispatch so that we can call reducer fun from app js
    return <button  onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>

}