import { useReducer } from "react"
import "./style.css"
import Digitbutton from "./Digitbutoons"
import Operationbutton from "./OperationButtons"

export const ACTIONS = {// Actions are defined
  ADD_DIGIT : 'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE : 'evaluate',


}

function reducer(state, {type, payload}) {
  switch(type){
    case ACTIONS.ADD_DIGIT: //So here we were running a code which gives us new state of object

    if(state.overwrite){
      return{
        ...state,
      currentOperand: payload.digit,
      overwrite: false,
      }
    }
    if(payload.digit === "0" && state.currentOperand === "0") {return state} // means your op is alredy zero and we cant add more zero cz it doesnt make any sense.
    if(payload.digit == "." && state.currentOperand.includes(".")) 
    {return state}
    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,// our current operand is null for some reason at start
    }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }
      if (state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation,
        }
      }
      
      if (state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand:null 
        }
    }
    if(currentOperand == null ) return state
    if(currentOperand.length === 1){// if the only 1 digit is remaining in co and we delete it then i want to reset the value to null instead of leaving empty string
      return{
        ...state,
        currentOperand: null,
      }

      // default case
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.previousOperand == null || state.currentOperand == null){
        return state
      }
      return{
        ...state,
        overwrite: true,
        previousOperand : null,
        operation : null,
        currentOperand: evaluate(state), 
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}){// we have to convert co, po strings to actual number
  const current = parseFloat(currentOperand)//The parseFloat() function parses an argument (converting it to a string first if needed) and returns a floating point number.
  const prev = parseFloat(previousOperand)
  if (isNaN(prev) || isNaN(current)) return ""// if not number for previous or current
  let computation = ""
  switch(operation){
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '-':
      computation = prev / current
      break
  }
  return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",  {
  maximumFractionDigits: 0,
})
function formatOperand(operand){
  if(operand == null) return
  const[integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App(){
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})// We used reducer to manage all different state like cuurentoperand, revious and operation

  
  return(
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" 
      onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <Operationbutton operation= "/" dispatch={dispatch}/>
      <Digitbutton digit= "1" dispatch={dispatch}/>
      <Digitbutton digit= "2" dispatch={dispatch}/>
      <Digitbutton digit= "3" dispatch={dispatch}/>
      <Operationbutton operation= "*" dispatch={dispatch}/>
      <Digitbutton digit= "4" dispatch={dispatch}/>
      <Digitbutton digit= "5" dispatch={dispatch}/>
      <Digitbutton digit= "6" dispatch={dispatch}/>
      <Operationbutton operation= "+" dispatch={dispatch}/>
      <Digitbutton digit= "7" dispatch={dispatch}/>
      <Digitbutton digit= "8" dispatch={dispatch}/>
      <Digitbutton digit= "9" dispatch={dispatch}/>
      <Operationbutton operation= "-" dispatch={dispatch}/>
      <Digitbutton digit= "0" dispatch={dispatch}/>
      <Digitbutton digit= "." dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>


  )
}

export default App