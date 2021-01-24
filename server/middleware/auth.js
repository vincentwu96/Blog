import jwt from 'jsonwebtoken';

// auth middleware
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // if len < 500, is custom token
        
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'temp');
            req.userId = decodedData?.id;
        }else{
            // else is the OAuth token
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next(); // pass action
    } catch (error) {
        console.log(error);
    }
}

export default auth;