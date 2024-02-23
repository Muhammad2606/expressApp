import jwt  from "jsonwebtoken"; 

const ganerateJWTToken = userId =>{
    const accessToken = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})
 return accessToken
}

export {ganerateJWTToken}
