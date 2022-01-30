import { Middleware } from 'redux';

const actionLog: Middleware = (store) => (next) => (action) => {
  console.log('state 當前:', store.getState());
  console.log('find action ', action);
  next(action);
  console.log('state 更新:', store.getState());
};

export { actionLog };
