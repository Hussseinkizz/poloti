import { createContext, useContext, useReducer, useMemo } from 'react';

// The Banker
export const store = createContext();
const initialState = {
  currentCategory: 'everything',
  showNav: false,
};

// The Handler
function reducer(state, action) {
  const { type, payload } = action;

  // functions / operators
  function incrementCount(currentState) {
    return currentState + 1;
  }
  function decrementCount(currentState) {
    return currentState - 1;
  }

  switch (type) {
    case 'SET_CURRENT_CATEGORY':
      return { ...state, currentCategory: payload.category };
    // Handle Nav Menu
    case 'OPEN_NAV':
      return {
        ...state,
        showNav: true,
      };
    case 'CLOSE_NAV':
      return {
        ...state,
        showNav: false,
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        showNav: !state.showNav,
      };
    default:
      throw new Error(`No action for type ${type} in state machine!`);
  }
}

// The Provider
export function StoreProvider({ children }) {
  const [state, setState] = useReducer(reducer, initialState);
  // memorise state value to prevent re-renders!
  const memorisedValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  );
  return <store.Provider value={memorisedValue}>{children}</store.Provider>;
}

// The consumer
export function useStore() {
  const useStore = useContext(store);

  if (useStore === undefined) {
    throw new Error(
      'UseStore must be consumed within the store context, make sure you wrapped the app in a store provider!'
    );
  }

  return useStore;
}

// Notes to dev:
// look into immer js for iterating arrays and how to inbuid it right away!
