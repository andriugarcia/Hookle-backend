import userService from './user.service'
import { ServerRoute } from '@hapi/hapi'

export default [
    {
        method: 'GET',
        path: '/getMe',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.getMe,
    },
    {
        method: 'POST',
        path: '/vote',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.vote,
    },
    {
        method: 'POST',
        path: '/updateFilters',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.updateFilters,
    },
    {
        method: 'POST',
        path: '/updateGenre',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.updateGenre,
    },
    {
        method: 'POST',
        path: '/fav',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.fav,
    },
    {
        method: 'POST',
        path: '/unfav',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.unfav,
    },
    {
        method: 'POST',
        path: '/buy',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: userService.buy,
    },
] as Array<ServerRoute>
