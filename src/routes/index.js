import HomeIcon from '@material-ui/icons/Home';
import GridOn from '@material-ui/icons/GridOn';
import Home from '../Home';
import Components from '../Components';
import NotFound from '../NotFound';
import { ROUTE_COMPONENTS, ROUTE_COMPONENTS_TABLES, ROUTE_HOME } from './constants';
import Tables from '../componentViews/TableView';

export const HomeRoute = {
    path: ROUTE_HOME,
    exact: true,
    name: 'Home',
    icon: HomeIcon,
    component: Home,
};

export const ComponentsRoute = {
    path: ROUTE_COMPONENTS,
    exact: true,
    name: 'Components',
    icon: GridOn,
    component: Components,
};

export const TableComponentRoute = {
    path: ROUTE_COMPONENTS_TABLES,
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
    ComponentsRoute,
    TableComponentRoute,
    NotFoundFallback,
];
