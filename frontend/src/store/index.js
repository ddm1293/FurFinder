import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice'
import formReducer from './formSlice'
import threadReducer from './threadSlice'
import commentReducer from './commentSlice'
import forumReducer from './forumSlice'

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  threads: threadReducer,
  comments: commentReducer,
  forum: forumReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // naming the threads with "s" to avoid some IDE error message
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

const persistor = persistStore(store);

export { store, persistor };
