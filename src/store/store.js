import { configureStore, createEntityAdapter } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import storage from 'redux-persist/lib/storage'; //로컬 스토리지
import storageSession from 'redux-persist/lib/storage/session'; //세션 스토리지
import rootReducer from './reducers';

const customEntityAdapter = createEntityAdapter();
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'product', 'optician', 'commonCode', 'navigation'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);
  return { ...persistor, ...store };
};

export const reduxWrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
