import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { apiOrder } from "./feature/ordersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiProduct } from "./feature/productsSlice";
import { apiUser } from "./feature/usersSlice";
import { apiCart } from "./feature/cartsSlice";

const reducers = combineReducers({
  [apiUser.reducerPath]: apiUser.reducer,
  [apiProduct.reducerPath]: apiProduct.reducer,
  [apiCart.reducerPath]: apiCart.reducer,
  [apiOrder.reducerPath]: apiOrder.reducer,
});
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiUser.middleware,
      apiProduct.middleware,
      apiCart.middleware,
      apiOrder.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
