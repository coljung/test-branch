import { GeneralExampleRoute, HomeRoute, TableExampleRoute } from './index';

export default [
    HomeRoute,
    {
        ...GeneralExampleRoute,
        collapse: true,
        views: [
            GeneralExampleRoute,
            TableExampleRoute,
        ],
    },
];
