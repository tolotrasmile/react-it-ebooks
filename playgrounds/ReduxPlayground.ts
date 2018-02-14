
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import { logger } from 'redux-logger'

interface IMathState {
  result: number
  lastValues: number[]
}

const mathInitialState: IMathState = {
  result: 0,
  lastValues: []
}

interface IUserState {
  name: string
  age: number
}

const userInitialState: IUserState = {
  name: 'Tolotra',
  age: 20
}

const mathReducer = (state = mathInitialState, action: AnyAction = { type: '' }) => {
  switch (action.type) {
    case 'ADD': {
      const lastValues = [...state.lastValues, action.payload]
      return { ...state, result: state.result + action.payload, lastValues }
    }
    case'SUBTRACT': {
      const lastValues = [...state.lastValues, action.payload]
      return { ...state, result: state.result - action.payload, lastValues }
    }
  }
  return state
}

const userReducer = (state = userInitialState, action: AnyAction = { type: '' }) => {
  switch (action.type) {
    case 'SET_NAME': {
      return { ...state, name: action.payload }
    }
    case'SET_AGE': {
      return { ...state, age: action.payload }
    }
  }
  return state
}

const store = createStore(combineReducers({ mathReducer, userReducer }), {}, applyMiddleware(logger))
store.subscribe(() => console.log('Store updated', store.getState()))
store.dispatch({ type: 'ADD', payload: 100 })
store.dispatch({ type: 'SUBTRACT', payload: 20 })
store.dispatch({ type: 'SET_NAME', payload: 'Smile' })
store.dispatch({ type: 'SET_AGE', payload: 29 })
