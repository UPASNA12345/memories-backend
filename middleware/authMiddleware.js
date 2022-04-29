import jwt from 'jsonwebtoken';

// verify the user is valid and not then check for authorization and then go to the next 
const auth = async(req, res, next) => {
      console.log('dddd', req)
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedata ;
        if(token && isCustomAuth){
            // for custom sign in
            decodedata = jwt.verify(token, 'testxyz');
            req.userId = decodedata?.id;
        }else{
            // for google signin
            decodedata = jwt.decode(token);
            req.userId = decodedata?.sub;

        }
        next();
        
    } catch (error) {
        console.log(error)
    }
}


export default auth;