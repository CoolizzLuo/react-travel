import i18n from 'i18next';
import { Middleware } from 'redux';
import { LanguageActionTypes } from '../language/languageActions';

const i18nChangeLanguage: Middleware = (store) => (next) => (action: LanguageActionTypes) => {
  if (action.type === 'change_language') {
    i18n.changeLanguage(action.payload);
  }
  next(action);
};

export { i18nChangeLanguage };
