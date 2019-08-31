import * as types from '../constants/actiontypes'

export const totalJobsCount = value => {

  debugger
  return ({
    type: types.TOTAL_JOBS_COUNT,
    payload: value
  })
}
