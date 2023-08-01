import home from './components/home.js';
import error from './components/error.js';
import register from './components/register.js';
import dashboard from './components/dashboard.js';

const root = document.getElementById('root');

const routes = [
    {path: '/', component: home},
    {path: '/register', component: register},
    {path: '/dashboard', component: dashboard},
    {path: '/error', component: error},
];

const defaultRouter = '/';

const navigateTo = (hash) => {
    const route = routes.find((routeFind)=>{
        return routeFind.path === hash;
    });
    if (route && route.component) {
        window.history.pushState({}, route.path, window.location.origin+route.path);
        if (root.firstChild) {
            root.removeChild(root.firstChild)
        }
        root.appendChild(route.component(navigateTo));
    } else {
        navigateTo('/error')
    }
}

window.onpopstate = () => {
    navigateTo(window.location.pathname)
}

navigateTo(window.location.pathname || defaultRouter)