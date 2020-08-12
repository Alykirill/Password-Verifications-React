import {rootReducer} from './reducer';
import { createStore } from 'redux';

export const store = createStore(rootReducer);
  
export type AppDispatch = typeof store.dispatch
  