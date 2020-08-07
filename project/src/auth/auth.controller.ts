import userService from '../user/user.service'
import { ServerRoute } from '@hapi/hapi'

export default [
    {
        method: 'POST',
        path: '/signup',
        handler: userService.signup,
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/signin',
        handler: userService.login,
        options: {
            auth: 'simple',
        },
    },
    {
        method: 'POST',
        path: '/verify',
        handler: userService.verify,
        options: {
            auth: 'jwt',
        },
    },
    {
        method: 'POST',
        path: '/recover',
        handler: userService.recover,
        options: {
            auth: 'jwt',
        },
    },
    {
        method: 'POST',
        path: '/sendRecoverPassword',
        handler: userService.sendRecoverPassword,
        options: {
            auth: false,
        },
    },
] as Array<ServerRoute>
