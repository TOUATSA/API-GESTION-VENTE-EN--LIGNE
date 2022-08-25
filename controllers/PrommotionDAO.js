
const ConnectionDB = require("../DB/dbConfig");

const ouvrirPrommotion=( request, response )=>{
           
          ConnectionDB.query(' select * from prommotion_produit where statut_promo=$1 ', ['ouvert'], (err, result)=>{
                if( !err ) {
                    if ( result.rows[0] === [] ) {
                    const {code_promo, message, date_fin, date_debut, les_produits} = request.body
                    ConnectionDB.query('insert into prommotion_produit (code_prommotion, message, date_debut, date_fin, statut_promo) values($1,$2,$3,$4,$5) ',
                      [code_promo, message, date_debut, date_fin, 'ouvert' ], (err, resultat)=>{
                           
                          if( !err ) {
                                            let produit_non_ajoute=[]
                                          les_produits.forEach((produit, index) => {
                                            ConnectionDB.query( 'update produit set periode = $1, prix_promo = $2, code_prommotion=$3 where id_produit = $4 ', [ 'prommotion', produit[1], code_promo, produit[0] ] )
                                             .then( )
                                             .catch( err => produit_non_ajoute.push('produit numero ' +index+' non ajoute dans la promo ,  pour motif ' + err) )
                                          });
                                          response.send( { status : produit_non_ajoute } )
                          }
                          else response.status(200).json({err})
            
                      } )
                } 
                else response.send( {message : 'Une prommotion active existe deja. Veillez l\'exploitez ou la fermer'} ) 

                }
                else response.send({err})
          } )
     
        

}

const fermerPromotion = ( request, response )=>{
       ConnectionDB.query('update prommotion_produit set statut_promo=$1 where code_prommotion=$2', ['fermer', request.params.code_promo] )
        .then( ()=>{
                 ConnectionDB.query(' update produit set prix_promo=$1, periode=$2, code_prommotion=$3 where code_prommotion=$4 ', [0, 'normal', 'non', request.params.code_promo ])
        } )
        .catch(err => response.status(201).json({err})) 
}

const addProductForPromo = ( request, response )=>{
    ConnectionDB.query-(' select code_prommotion from prommotion_produit where statut_promo=$1 ', ['ouvert'], 
     (err, result)=>{
           if(err) response.status(200).send( {err} )
           else {
                     const code_prommotion = result.rows[0].code_prommotion   
                     ConnectionDB.query( 'update produit set periode=$1, prix_promo=$2, code_prommotion=$3 where id_produit=$4 ', 
                       ['prommotion', request.params.prix_promo, code_prommotion, request.params.id_produit]  )
           }
     } )
}

module.exports={ ouvrirPrommotion, fermerPromotion, addProductForPromo }