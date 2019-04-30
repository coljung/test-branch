import HomeIcon from '@material-ui/icons/Home';
import TableIcon from '@material-ui/icons/TableChart';
import NotFound from '../NotFound';
import { ROUTE_HOME, ROUTE_LISTING } from './constants';
import ListingView from '../exampleViews/ListingView';

export const HomeRoute = {
    path: ROUTE_HOME,
    exact: true,
    name: 'Home',
    icon: HomeIcon,
    component: ListingView,
};

export const NotFoundFallback = {
    component: NotFound,
    visible: false,
};

export const ListingRoute = {
    path: ROUTE_LISTING,
    exact: true,
    name: 'Purchase Orders',
    icon: TableIcon,
    component: ListingView,
};

export default [
    HomeRoute,
    ListingRoute,
    NotFoundFallback,

];
