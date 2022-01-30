import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionLog';
import { i18nChangeLanguage } from './middlewares/i18nChangeLanguage';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, i18nChangeLanguage));

export type RootState = ReturnType<typeof store.getState>;

export default store;
