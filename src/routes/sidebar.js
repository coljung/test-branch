import InfoIcon from '@material-ui/icons/Info';
import { HomeRoute, ListingRoute } from './index';

export default [
    HomeRoute,
    {
        exact: true,
        name: 'General',
        icon: InfoIcon,
        collapse: true,
        views: [
            ListingRoute,
        ],
    },
];
