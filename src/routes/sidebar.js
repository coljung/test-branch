import { GeneralExampleRoute, HomeRoute, TableExampleRoute, ListingRoute } from './index';

export default [
    HomeRoute,
    {
        ...GeneralExampleRoute,
        collapse: true,
        views: [
            GeneralExampleRoute,
            TableExampleRoute,
            ListingRoute,
        ],
    },
];
