// reduxPersistConfig.js
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  // Other configuration options...
};

const persistedReducer = (rootReducer) => persistReducer(persistConfig, rootReducer);

export default persistedReducer;
