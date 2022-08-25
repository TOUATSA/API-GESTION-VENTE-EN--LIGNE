
const ConnectionDB = require("../DB/dbConfig");

const createProduit=( request, response )=>{
    
    
    const {prix, categorie, description, quantite, marque, photo_produit } = request.body
    ConnectionDB.query('insert into produit ( prix, categorie, description,  quantite_dispo, marque, photo_produit, periode, code_prommotion ) values ( $1,$2,$3,$4,$5, $6 )', 
    [ prix, categorie, description, quantite, marque, request.protocol+'://'+request.get('host')+'/photo/'+ mail + '/local/' + request.file.filename , 'normal', 'non' ], (err)=>{
        if(err) response.json({ err : err })
        else response.json({ message : 'produit cree avec success' })
    } )
}

const findOneProduit=( request, response)=>{
         ConnectionDB.query('select * from produit where id_produit=$1', [request.params.idproduit], ( err, result )=>{
            if(err) response.status(401).send({ err : err })
            else response.status(200).send(result.rows[0])
         } )
}

const updateProduit = (request, response)=>{
         const { change_field, value_field, id_produit } = request.params
         let ch=''
         if( change_field.trim()==='prix' )
               ch=' update produit set prix=$1 where id_produit =$2 '
         else 
               ch=' update produit set quantite_dispo+=$1 where id_produit =$2 '        
         ConnectionDB.query(ch, [value_field, id_produit], (err, resultat)=>{
               if(err) response.status(401).send({ err : err })
               else response.status(200).send({ message : 'modification effectue avec success' })
       
         } )
}

const allProduit = ( request, response )=>{
    ConnectionDB.query('select * from produit where quantite_dispo > 0 ', (error, result)=>{
        if(error) response.status(401).send({ error : error })
        else response.status(200).send(result.rows)
    } )
}

const produitOfPromo = (request, response)=>{
    ConnectionDB.query(' select * from produit where periode=$1 ', ['prommotion'], (err, result)=>{
            
    } )
}

module.exports={ allProduit, createProduit, findOneProduit, updateProduit, createProduit, produitOfPromo }