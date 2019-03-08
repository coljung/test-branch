import HomeIcon from '@material-ui/icons/Home';
import GridOn from '@material-ui/icons/GridOn';
import Home from '../Home';
import General from '../exampleViews/GeneralView';
import NotFound from '../NotFound';
import { ROUTE_EXAMPLES, ROUTE_EXAMPLES_TABLES, ROUTE_HOME } from './constants';
import Tables from '../exampleViews/TableView';

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
    path: ROUTE_EXAMPLES_TABLES,
    exact: true,
    name: 'Tables',
    component: Tables,
};

export const NotFoundFallback = {
    component: NotFound,
    visible: false,
};
 
export default [
    HomeRoute,
    GeneralExampleRoute,
    TableExampleRoute,
    NotFoundFallback,
];
