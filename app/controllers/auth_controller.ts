// import type { HttpContext } from '@adonisjs/core/http'
import Usuario from "#models/usuario"
import { AuthService } from "#services/auth_service"

const authservice = new AuthService()//instancia
export default class AuthController {
    async register ({request, response}){
        const {email,password} =request.body()
        const respuesta = await authservice.register(email,password)
        response.json({msj:'usuario registrado', respuesta})
    }

    async login({request, response}){
        const {email, password} = request.body()
        const lista=await authservice.login(email,password)
        return response.json(lista)
    }

    async perfil ({request, response}){
        const authheader = request.header('Authorization')
        if(!authheader){
            return response.json({msj:'token obligatorio'})
        }
        else{
            const token = authheader.replace('Bearer','').trim()//limpia el token
            try {
                const resp = await authservice.perfil(token)
                response.json({msj:resp})
            } catch (error) {
                return 'token invalido'
            }
        }
    }

    async perfil2 ({request, response}){
        return response.json({msj:'funcionando'})
    }

    //crear un metodo para que me traiga a las personas que el email traiga la A
    async buscarA({request, response}){
        try{
            const resp=await authservice.buscarA()
            return response.json({resp})
        }catch(error){
            return response.json({error:error.message})
        }
    }
}