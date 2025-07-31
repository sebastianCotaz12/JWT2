import AuthController from "#controllers/auth_controller";
import router from "@adonisjs/core/services/router";
import AuthJwt from "#middleware/auth_jwt";

export const  auth = new AuthController()
const authjwt = new  AuthJwt

router.post('/registrar', auth.register)
router.post('/login', auth.login)
router.get('/perfil', auth.perfil)
router.get('/perfil2', auth.perfil2).use(authjwt.handle.bind(authjwt))//bind
//El error era que me faltaba el bind, el cual se utiliza para que el this(authjwt) no se pierda y el middleware no falle
router.get('/buscar',auth.buscarA).use(authjwt.handle.bind(authjwt))
