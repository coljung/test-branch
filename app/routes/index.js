import HomeIcon from '@material-ui/icons/Home';
import Home from '../Home';
import NotFound from '../NotFound';
import { ROUTE_HOME } from './constants';

export default [
    {
        path: ROUTE_HOME,
        name: 'Home',
        exact: true,
        icon: HomeIcon,
        component: Home,
    },
    { component: NotFound },
];
