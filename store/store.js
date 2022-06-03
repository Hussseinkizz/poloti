import { createContext, useContext, useReducer } from 'react';

export const store = createContext();
const initialState = {
  currentCategory: 'everything',
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_CATEGORY':
      return { ...state, currentCategory: action.category };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <store.Provider value={value}>{children}</store.Provider>;
}

export function useStore() {
  const useStore = useContext(store);

  return useStore;
}
