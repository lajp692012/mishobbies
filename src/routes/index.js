import {Router} from 'express'

const router = Router()

router.get('/',(req,res) => res.render('index',{title:'Proyecto Final: Mis Hobbies'}))
router.get('/about',(req,res) => res.render('about',{title:'Introduccion'}))
router.get('/galeria',(req,res) => res.render('galeria',{title:'Galeria de Fotos'}))
router.get('/contacto',(req,res) => res.render('contacto',{title:'Contáctame'}))

export default router
