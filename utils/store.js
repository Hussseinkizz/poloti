import { createContext, useContext, useReducer } from 'react';

export const store = createContext();
const initialState = {
  currentSortLocation: '',
  currentSortPrice: '',
  currentSortSize: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION_SORT':
      return { ...state, currentSortLocation: action.location };
    case 'SET_CURRENT_PRICE_SORT':
      return { ...state, currentSortPrice: action.price };
    case 'SET_CURRENT_SIZE_SORT':
      return { ...state, currentSortSize: action.size };
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
