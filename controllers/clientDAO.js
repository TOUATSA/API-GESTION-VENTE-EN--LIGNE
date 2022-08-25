
const ConnectionDB = require("../DB/dbConfig");
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

const createClient = ( request, response )=>{
    const { nom, password, email, carte_bancaire } = request.body
    ConnectionDB.query('select * from client where nom_client=$1', [nom] , (error, result)=>{
           if(error)  response.status(400).send({ error })
           else{

                      if( result.rows===[] )  {

                        bcrypt.hash(password, 10)
                        .then(hachage => {
                                 ConnectionDB.query(' insert into client (nom_client, motdepasse, email, numero_carte) values ($1,$2,$3,$4) ', [nom, hachage, email, carte_bancaire], 
                                  ( err_query )=>{ 
                                    if(!err_query) {
                                       // response.redirect('/api/commande/id_cmd')
                                       response.status(200).json({
                                        nextroute: '/api/commande/' + nom,
                                        token: jwt.sign(
                                            { nomClient: nom, },
                                            'RANDOM_TOKEN_SECRET',
                                            { expiresIn: '1h' }
                                        )
                                    });
                                    }
                                    else response.status(400).send({ err_query})
                                   }  ) 
                        })
                        .catch(error_hash => res.status(500).json({ error_hash }));   

                      }
                      else
                          response.status(200).send({ message : 'CE NOM EST DEJA UTILISE PAR QUELQU\'UN D\'AUTRE. INSEREZ EN UN AUTRE ' })
           }
    } )      
}

const loginClient = ( request, response )=>{
       const { nom, password } = request.body
       ConnectionDB.query('select * from client where nom_client=$1', [nom] , (error, result)=>{
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
                                // res.status(200).send({message : 'parametre de connexion valide' });
                                response.status(200).json({
                                    nextroute: '/api/commande/' + nom,
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

const compteClient = ( request, response )=>{
                   response.redirect(200, '/api/commande/' + request.params.nom_client)
}

module.exports={ createClient, loginClient, compteClient }