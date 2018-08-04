import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

//reducer for the banner
const initialMessage = <div>Test Intro Banner</div>

const banners = (state = [{'message': initialMessage, 'type': 'alert-info'}], action) => {
    switch (action.type) {
        case 'ADD_BANNER':
            return state.concat({'message': action.message, 'type': action.kind});
        case 'REMOVE_BANNER':
            var newS = state;
            newS.splice(action.id, 1);
            return newS;
        default:
            return state;
        }
}

//redux store
export const store = createStore(banners, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


//root render of the application
const render = () => {
    ReactDOM.render(
        <div>
            <App />
        </div>,
        document.getElementById('root')
    );
};

//linking the store to rendering the application
store.subscribe(render);
render();
registerServiceWorker();
