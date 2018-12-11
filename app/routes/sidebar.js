import { ComponentsRoute, HomeRoute, TableComponentRoute } from './index';

export default [
    HomeRoute,
    {
        ...ComponentsRoute,
        collapse: true,
        views: [
            TableComponentRoute,
        ],
    },
];
