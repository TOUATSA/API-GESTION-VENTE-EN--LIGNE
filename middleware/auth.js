
const jwt = require('jsonwebtoken');
 
module.exports = (request, response, next) => {
   try {
       const token = request.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const nomClient = decodedToken.nomClient;
       request.auth = {
          nomClient: nomClient
       };
    next();
   } catch(error) {
       res.status(401).json({ message : 'veillez vous authentifiez ( identifiez ) avant toute choses ' });
   }
};