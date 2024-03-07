import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'
import Button from './components/Button'

const store = createStore(counterReducer)

const handleGoodClick = () => {
  store.dispatch({ type: 'GOOD' })
  console.log("Good:", store.getState().good)
}

const handleNeutralClick = () => {
  store.dispatch({ type: 'OK' })
}

const handleBadClick = () => {
  store.dispatch({ type: 'BAD' })
}

const handleResetClick = () => {
  store.dispatch({ type: 'RESET' })
}

const App = (props) => {

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="good" handlerFunction={handleGoodClick} />
      <Button text="okay" handlerFunction={handleNeutralClick} />
      <Button text="bad" handlerFunction={handleBadClick} /> &nbsp; &nbsp;
      <Button text="reset" handlerFunction={handleResetClick} />
      <h2>Statistics </h2>
      <p> Good: {props.good} </p>
      <p> Okay: {props.okay} </p>
      <p> Bad: {props.bad} </p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {

  const goodCount = store.getState().good
  const okayCount = store.getState().ok
  const badCount = store.getState().bad

  root.render(<App good={goodCount} okay={okayCount} bad={badCount} />)
}

renderApp()
store.subscribe(renderApp)