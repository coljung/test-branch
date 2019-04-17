import HomeIcon from '@material-ui/icons/Home';
import GridOn from '@material-ui/icons/GridOn';
import Home from '../Home';
import General from '../exampleViews/GeneralView';
import NotFound from '../NotFound';
import { ROUTE_EXAMPLES, ROUTE_TABLES, ROUTE_HOME, ROUTE_LISTING } from './constants';
import TableView from '../exampleViews/TableView';
import ListingView from '../exampleViews/ListingView';

export const HomeRoute = {
    path: ROUTE_HOME,
    exact: true,
    name: 'Home',
    icon: HomeIcon,
    component: Home,
};

export const GeneralExampleRoute = {
    path: ROUTE_EXAMPLES,
    exact: true,
    name: 'General',
    icon: GridOn,
    component: General,
};

export const TableExampleRoute = {
    path: ROUTE_TABLES,
    exact: true,
    name: 'Tables',
    component: TableView,
};

export const NotFoundFallback = {
    component: NotFound,
    visible: false,
};

export const ListingRoute = {
    path: ROUTE_LISTING,
    exact: true,
    name: 'Listing View',
    component: ListingView,
};

export default [
    HomeRoute,
    GeneralExampleRoute,
    TableExampleRoute,
    ListingRoute,
    NotFoundFallback,

];
