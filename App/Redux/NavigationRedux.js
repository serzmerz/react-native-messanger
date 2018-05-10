import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}

/* ------------- Selectors ------------- */

export const navSelector = state => state.nav
