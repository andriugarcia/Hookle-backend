import userService from './user.service'
import { ServerRoute } from '@hapi/hapi'

export default [
    {
        method: 'GET',
        path: '/getMe',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.getMe,
    },
    {
        method: 'POST',
        path: '/vote',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.vote,
    },
    {
        method: 'POST',
        path: '/updateFilters',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.updateFilters,
    },
    {
        method: 'POST',
        path: '/updateGenre',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.updateGenre,
    },
    {
        method: 'POST',
        path: '/fav',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.fav,
    },
    {
        method: 'POST',
        path: '/unfav',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.unfav,
    },
    {
        method: 'POST',
        path: '/buy',
        options: {
            auth: {
                strategies: ['google', 'jwt'],
            }
        },
        handler: userService.buy,
    },
] as Array<ServerRoute>
