const server = require('./dist/index.js')
let base64 = require('base-64')

let token = ''

beforeAll((done) => {
    server.events.on('start', () => {
        done()
    })
})

afterAll((done) => {
    server.events.on('stop', () => {
        done()
    })
    server.stop()
})

test('Falla al iniciar sesion', async function () {
    const options = {
        method: 'POST',
        url: '/signin',
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(401)
})

test('Contraseña Incorrecta', async function () {
    const options = {
        method: 'POST',
        url: '/signin',
        headers: {
            Authorization:
                'Basic ' + base64.encode('gvdrews@gmail.com:incorrecto'),
        },
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(401)
})

it('Deberia iniciar sesión correctamente', async function () {
    const options = {
        method: 'POST',
        url: '/signin',
        headers: {
            Authorization: 'Basic ' + base64.encode('gvdrews@gmail.com:1234'),
        },
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(200)
    expect(data.result.accessToken).toBeDefined()
    token = data.result.accessToken
})

it('Deberia obtener correctamente el usuario', async function () {
    const options = {
        method: 'GET',
        url: '/getMe',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(200)
    expect(data.result.email).toBe('gvdrews@gmail.com')
})

it('Deberia obtener correctamente el stack', async function () {
    const options = {
        method: 'GET',
        url: '/stack',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(200)
    expect(data.result.length).toBeGreaterThan(0)
})

it('Deberia actualizar los filtros', async function () {
    const options = {
        method: 'POST',
        url: '/updateFilters',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: {
            filters: ['hat'],
        },
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(200)
})

it('Deberia actualizar el género', async function () {
    const options = {
        method: 'POST',
        url: '/updateGenre',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: {
            genre: 'women',
        },
    }
    const data = await server.inject(options)
    expect(data.statusCode).toBe(200)
})

it('Deberia tener los filtros actualizados', async function () {
    const options = {
        method: 'GET',
        url: '/getMe',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    const data = await server.inject(options)
    console.log('FILTERS', data.result.filters)
    expect(data.statusCode).toBe(200)
    expect(data.result.filters).toEqual(['hat'])
    expect(data.result.genre).toBe('women')
})
