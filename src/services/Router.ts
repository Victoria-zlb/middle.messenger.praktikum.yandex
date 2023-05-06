import Page from '../pages/Page';
import { Constructable, Route } from './Route';
import { Page404 } from '../pages/404';
// import { EventBus } from '../services/EventBus';
// import { EVENTS } from '../constants/events';

//const appBus = new EventBusSingl();

export class Router {
    protected static __instance: Router;
    public routes: Route[] = [];
    static _route404: Route;
    public history = window.history;
    protected _currentRoute?: Route | null;
    protected _rootQuery: string;
    constructor(protected rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
        Router._route404 = new Route('', Page404, { rootQuery: this._rootQuery });
    }

    use(pathname: string, block: Constructable<Page>) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const pathname = event.currentTarget instanceof Window ? event.currentTarget.location.pathname : undefined;
            if (pathname) {
             this._onRoute(pathname);
            }
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            Router._route404.render();
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes.find((route) => route.match(pathname));
        return route;
    }
}