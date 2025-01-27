import express from 'express'
import { ProductsRouter } from '../routes/products.js'
import { CartRouter } from '../routes/cart.js'
import { config } from '../routes/index.js'

const initApp = () => {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded())
    app.use('/', express.static(config.dirname + 'public'))
    app.use(logger)

    /**
   * @typedef {Object} Gatito
   * @property {string} name
   * @property {string} raza
   * @property {string} id
   */

    const gatitos = []

    app.post('/api/gatito', (req, res) => {
        /**
         * @type {Gatito}
         */
        const gatito = req.body

        if (!gatito.name || !gatito.raza) {
            return res.status(400).send({
                message: 'Error al crear un gatito',
                error: 'Valores incompletos',
            })
        }
        gatito.id = gatitos.length + 1

        gatitos.push(gatito)

        return res.status(200).send({
            message: 'Gatito creada',
            data: { ...gatito },
        })

        // res.status(304).redirect('/virtual')
    })

    const middlewareHome = (req, res, next) => {
        req.mensajeBienvenida = 'Bienvenido al home gato!'
        // res.send('ok')
        next()
    }

    app.get('/api/home', middlewareHome, (req, res) => {
        // throw new Error('Oops ocurrio un error')
        res.status(200).send({ message: req.mensajeBienvenida })
    })

    app.use('/api/pets', PetsRouter)
    app.use('/api/users', UsersRouter)

    // app.use('/pets', PetsRouter)

    // app.use(express.static('public'))

    // app.use('/virtual', express.static('public'))

app.use('/api/products', ProductsRouter)
app.use('/api/cart', CartRouter)


    console.log(config.dirname)
    return app
}

export default initApp
