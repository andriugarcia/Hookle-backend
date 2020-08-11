import clothingService from './clothing.service'
import { ServerRoute } from '@hapi/hapi'

export default [
    {
        method: 'GET',
        path: '/historial/{order}/{page}',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: clothingService.getHistorial,
    },
    {
        method: 'GET',
        path: '/favorites/{page}',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: clothingService.getFavorites,
    },
    {
        method: 'GET',
        path: '/bought/{page}',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: clothingService.getBought,
    },
    {
        method: 'GET',
        path: '/stack',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: clothingService.getStack,
    },
    {
        method: 'GET',
        path: '/fav/{clothing}',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: clothingService.getFavProduct,
    },
] as Array<ServerRoute>
