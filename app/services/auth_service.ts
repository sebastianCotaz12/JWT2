
import Usuario from "#models/usuario"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const SECRET = process.env.jwt_secret || 'secreto123'
export class AuthService {
  // Your code here

  async register (email, password) {
    const haspass = await bcrypt.hash(password, 10)
    const nuevo = await Usuario.create({email, password})
    return nuevo
  }

  async login(email: string, password: string){
    if (!email || !password){
      return "el email o password es obligatorio"
    }
    else {
      const resp = await Usuario.findBy('email', email)
      if(resp){
        const val = await bcrypt.compare(password,resp.password)
        if(val){
          return "contraseña incorreta"
        }
        const token = jwt.sign({
          id:resp.id,
          email:resp.email,
          timestamp:Date.now()
        },
        SECRET,
        {
          expiresIn:'1h'
        }
        )
        return {token, resp}
      }
      else{
        return "el usuario no existe"
      }
    }
  }


  async perfil(token){
    try {
      const jwtcoded = await jwt.verify(token, SECRET)
      const lista=Usuario.all()
      return lista
    } catch (error) {
      return 'token invalido'
    }
    
  }
  async buscarA(){
        const lista= await Usuario.query()
        .select('email')
        .whereLike('email','a%')
        return  lista

    }

}