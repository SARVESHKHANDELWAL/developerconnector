import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware=[thunk];
const initalState={};  

//[]-our reducers ,()-empty objects
//...-spread opertor 

const store=createStore(rootReducer,initalState,compose(
    applyMiddleware(...middleware),
    //to see actions and state on  redux dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
);
export default store;