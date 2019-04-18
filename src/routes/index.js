import HomeIcon from '@material-ui/icons/Home';
import TableIcon from '@material-ui/icons/TableChart';
<<<<<<< HEAD
import GradeIcon from '@material-ui/icons/Grade';
import ListIcon from '@material-ui/icons/List';
import Home from '../Home';
import General from '../exampleViews/GeneralView';
=======
>>>>>>> feat: PO DEMO WIP
import NotFound from '../NotFound';
import { ROUTE_HOME, ROUTE_LISTING } from './constants';
import ListingView from '../exampleViews/ListingView';

export const HomeRoute = {
    path: ROUTE_HOME,
    exact: true,
    name: 'Home',
    icon: HomeIcon,
<<<<<<< HEAD
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
=======
    component: ListingView,
>>>>>>> feat: PO DEMO WIP
};

export const NotFoundFallback = {
    component: NotFound,
    visible: false,
};

export const ListingRoute = {
    path: ROUTE_LISTING,
    exact: true,
<<<<<<< HEAD
    name: 'Listing View',
    icon: ListIcon,
=======
    name: 'Purchase Orders',
    icon: TableIcon,
>>>>>>> feat: PO DEMO WIP
    component: ListingView,
};

export default [
    HomeRoute,
    ListingRoute,
    NotFoundFallback,

];
