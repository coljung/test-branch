import HomeIcon from '@material-ui/icons/Home';
import TableIcon from '@material-ui/icons/TableChart';
import GradeIcon from '@material-ui/icons/Grade';
import ListIcon from '@material-ui/icons/List';
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
    icon: GradeIcon,
    component: General,
};

export const TableExampleRoute = {
    path: ROUTE_TABLES,
    exact: true,
    name: 'Tables',
    icon: TableIcon,
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
    icon: ListIcon,
    component: ListingView,
};

export default [
    HomeRoute,
    GeneralExampleRoute,
    TableExampleRoute,
    ListingRoute,
    NotFoundFallback,

];
