import clothingService from './clothing.service'
import { ServerRoute } from '@hapi/hapi'

export default [
    {
        method: 'GET',
        path: '/historial/{type}/{page}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothingService.getHistorial,
    },
    {
        method: 'GET',
        path: '/favorites/{page}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothingService.getFavorites,
    },
    {
        method: 'GET',
        path: '/bought/{page}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothingService.getBought,
    },
    {
        method: 'GET',
        path: '/stack',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothingService.getStack,
    },
] as Array<ServerRoute>
