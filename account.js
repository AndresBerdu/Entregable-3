import express from 'express'
import { USERS_BBDD } from './DataBase/USERS_BBDD.js'

const accountRouter = express.Router();

//Middleware que loguea la ip
accountRouter.use((req, res, next) => {
    console.log(req.ip);
  
    next()
})

//Crear un usuario 
accountRouter.post('', (req, res) => {

    const { _id, index ,guid, age, name, gender, company, email, phone } = req.body

    if (!name || !guid) return res.status(400).send();

    const user = USERS_BBDD.find( user => user.guid === guid)
    
    if (user) return res.status(409).send()

    USERS_BBDD.push({
        _id, index ,guid, age, name, gender, company, email, phone
    })

    return res.send()
})

//Actualizar un usuario
accountRouter.put('/:guid', (req, res) => {
   
    const { guid } = req.params

    const {index , age, name, gender, company, email, phone } = req.body

    if ( !name ) return res.status(400).send();

    const user = USERS_BBDD.find( user => user.guid === guid)
    
    if (!user) return res.status(404).send()

    user.index = index
    user.age = age
    user.name = name
    user.gender = gender
    user.company = company
    user.email = email
    user.phone = phone

    return res.send(user)
})

//Eliminar una cuenta
accountRouter.delete('/:guid', (req, res) => {
    const { guid } = req.params;

    const userIndex = USERS_BBDD.findIndex( user => user.guid === guid)
    
    if (userIndex === -1) return res.status(404).send()

    USERS_BBDD.splice(userIndex, 1)

    return res.send()
})

//Mostrar todos los usuarios 
accountRouter.get('/users', (req, res) => {
    return res.send(USERS_BBDD)
})

//Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/:guid', (req, res) => {
    const { guid } = req.params;

    const user = USERS_BBDD.find( user => user.guid === guid)
    
    if (!user) return res.status(404).send()

    return res.send(user)
})

//Mostrar por compañia
accountRouter.get('/company/:company', (req, res) => {
    const { company } = req.params;

    const user = USERS_BBDD.filter (user => user.company === company)

    if(!user) return res.status(404).send()

    return res.send(user)
})

//bustar todos los usuarios menores de 30 años
accountRouter.get('/age/30', (req, res) => {

    const user = USERS_BBDD.filter (user => user.age < 30)

    if(user >= 30) return res.status(400).send

    return res.send(user)
})

export default accountRouter