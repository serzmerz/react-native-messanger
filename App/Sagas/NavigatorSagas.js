import { fork, cancel, select } from 'redux-saga/effects'
import {getCurrentRouteName} from '../Redux/ScreenTrackingMiddleware'
import {navSelector} from '../Redux/NavigationRedux'
import {routesByScreen} from '../Navigation/AppNavigation'

export default function (api) {
  let task
  return function * navigator ({ params }) {
    if (task) yield cancel(task)
    const nav = yield select(navSelector)
    const route = getCurrentRouteName(nav)
    console.log('Call sagas for route ', route)
    if (route in routesByScreen && 'sagas' in routesByScreen[route]) {
      if (typeof routesByScreen[route].sagas.default === 'function') {
        task = yield fork(routesByScreen[route].sagas.default, api, params)
      }
    }
  }
}
