import { combineReducers } from 'redux'
import jobs from './jobsReducer'
// import {reducer as formReducer } from 'redux-form'
const rootReducer = combineReducers({
  jobs
})

export default rootReducer
