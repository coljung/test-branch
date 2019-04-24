import InfoIcon from '@material-ui/icons/Info';
import { GeneralExampleRoute, HomeRoute, TableExampleRoute, ListingRoute } from './index';

export default [
    HomeRoute,
    {
        exact: true,
        name: 'General',
        icon: InfoIcon,
        collapse: true,
        views: [
            GeneralExampleRoute,
            TableExampleRoute,
            ListingRoute,
        ],
    },
];
