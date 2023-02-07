import rootReducer from './reducer';
import {applyMiddleware, createStore, compose} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['darkmode','profile','placeDetail', 'book']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))

let persistor = persistStore(store)

export {store,persistor}


  
