import  Jwt  from "jsonwebtoken"

export function CheckAuthentication(req:any, res:any){

    const token:string | null = req.cookies.token
    if(!token){
        console.log("Not Token")
        return {req, res}    
    }

    const decoded: any = Jwt.verify(token, String(process.env.JWT_SECRET))
    
    
    if(!decoded) {
        return {req, res}
    }

    const User = {
        ID: decoded.ID,
        Role: decoded.role
    }

    return {req, res, User}    

}