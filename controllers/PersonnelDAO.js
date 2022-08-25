
const jwt = require('jsonwebtoken');
const { response } = require('express')
const {DAOContext , pool }  =  require('../DB/dbConfig')
const bcrypt = require('bcrypt')

const loginClient = ( request, response )=>{
    const { nom, password, status } = request.body
    ConnectionDB.query('select * from personnel where nom_client=$1', [nom] , (error, result)=>{
           if(error)  response.status(400).send({ error })
           else{

                      if( result.rows===[] )  response.status(200).send({ message : 'aucun utilisateur n\'a ete enregistrer a ce nom. veuillez ressayer ' })
                      else{
                         const client=result.rows[0]
                         bcrypt.compare(password, client.motdepasse)
                         .then(valid => {
                             if (!valid) {
                                 return res.status(401).send({ message: 'le mot de passe saisit est incorrecte. ressayer' });
                             }

                             response.status(200).json({
                                nnextroute: '/api/commande',
                                token: jwt.sign(
                                    { nomClient: nom, },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '1h' }
                                )
                            });

                         })
                         .catch(error => res.status(500).json({ error }));
                      } 
           }
    } )
}
  
module.exports = { loginClient }