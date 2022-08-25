
const ConnectionDB = require("../DB/dbConfig");
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

const createCommande=( request, response )=>{
    // ceci se realise par le biais d'une requete AJAX
    let { nom_client, data, data_payement, email } = request.body
    let prix_total=0
    let requete = 'insert into ligne_cmd (id_produit, nom_client, quantite, sous_total) values '
    let data_cmd = []
    let rapport_query=[]

    try {
        
        stripe.customers.create({ name: nom_client,  email: email, source: stripeToken })
        .then(customer => stripe.charges.create({
            amount: prix_total,
            currency: "usd",
            customer: customer.id})
        )
        .then(() => { 
            data.forEach(element => {
                element[3] = parseInt( element[3] )
                element[1] = parseInt( element[1] )
                element[2] = parseInt( element[2] )
        
                ConnectionDB.query('update produit set quantite_dispo -=$1 where id_produit=$2  ', [element[1], element[3]] )
                .then(  rep=> rapport_query.push(' le produit ' + donnee[0] +' a ete ajoute au pannier ') )
                .catch( err=> rapport_query.push(' le produit ' + donnee[0] +' n\'ont ajoute au pannier pour quantite non disponnible ') )
        
                requete+= '('+ element[3] + ',' + nom_client + ',' + element[1] + ',' + element[2] + '),'
                data_cmd.push( element[0] + '-' + element[1] + '-' + element[2] + '-' + element[3] )
                prix_total += element[2]
            });
            requete=requete.trimEnd(',')
            data_cmd=data_cmd.join(',,')
        
            ConnectionDB.query(requete, (err, resultat)=>{
                if(err) response.status(401).send({ err : err })
                else {
        
                      ConnectionDB.query('insert into commande (nom_client, cmdDate, liste_cmd, status) values ($1,$2,$3) ', [nom_client,Date.now(), data_cmd, 'non traite'],
                      (err1)=>{
                        if(err1)  response.status(401).send({ err : err1 })
                        else response.status(200).send({ message : 'votre a ete enregistrer avec sucess' })
                      }  )
                }
            } )
        
            response.json( { message : 'payement successfull' } ) 
         })
        .catch(err => response.send(err));

    } catch (error) {
         //  console.log( 'payement failled \n\n ' + error );
          response.json({error})
    }
    
}

const allCommandFull = (request, response)=>{
                  ConnectionDB.query('select * from commande', (err, resultat)=>{
                         
                    if(error)  response.status(401).send({ error })
                    else {
                                let liste_cmdes=resultat.rows
                                
                                     response.status(200).send({ message : 'aucune commande n\'a ete passe ces derniers temps' })

                                    liste_cmdes.map( data=>{
                                        const nom_client=data.nom_client
                                        let com_date=new Date( data.cmdDate )
                                        let commandes=data.liste_cmd
                                        commandes=commandes.split(',,')
                                        commandes=commandes.map( cmde => { 
                                            cmde=cmde.split('-')
                                            return {designation : cmde[0], quantite : cmde[1], id_produit : cmde[2], sous_total : cmde[3] }
                                        } )
                                        return { client : nom_client, heure : com_date, mes_cmde : commandes }
                                } )

                  } 
})
}

const allCommandeUnProcess=( request, response )=>{
                  ConnectionDB.query('select * from commande where status=$1 order by cmdDate DESC', ['non traite'] , (error, resultat)=>{
                    if(error)  response.status(401).send({ error })
                    else {
                                let liste_cmdes=resultat.rows
                                
                                if( liste_cmdes.length === 0 )
                                     response.status(200).send({ message : 'aucune commande n\'a ete passe ces derniers temps' })

                                 else {

                                    liste_cmdes.map( data=>{
                                        const nom_client=data.nom_client
                                        let com_date=new Date( data.cmdDate )
                                        let commandes=data.liste_cmd
                                        commandes=commandes.split(',,')
                                        commandes=commandes.map( cmde => { 
                                            cmde=cmde.split('-')
                                            return {designation : cmde[0], quantite : cmde[1], id_produit : cmde[2], sous_total : cmde[3] }
                                        } )
                                        return { client : nom_client, heure : com_date, mes_cmde : commandes }
                                } )

                                 }
                    }
                  } )
}

const commandeForAClient=( request, response )=>{

    ConnectionDB.query('select cmdDate, list_cmd from commande where nom_client=$1 group by status order by cmdDate DESC', [request.params.nom_client] , (error, resultat)=>{
        if(error)  response.status(401).send({ error })
        else {
                    let liste_cmdes=resultat.rows
                    const nom_client = request.params.nom_client
                    
                    if( liste_cmdes.length === 0 )
                    response.status(200).send({ message : 'aucune commande n\'a ete effectue par vous sur notre site' })

                else { 

                    liste_cmdes.map( data=>{
                            let com_date=new Date( data.cmdDate )
                            let commandes=data.liste_cmd
                            commandes=commandes.split(',,')
                            commandes=commandes.map( cmde => { 
                                cmde=cmde.split('-')
                                return {designation : cmde[0], quantite : cmde[1], id_produit : cmde[2], sous_total : cmde[3] }
                            } )
                            return { client : nom_client, heure : com_date, mes_cmde : commandes }
                    } )
                }
        }
      } )

} 

const updateCommande=( request, response )=>{

        ConnectionDB.query(' update commande set status=$1 where id_cmd =$2 ', [request.query.status, request.query.id_commande],
         (err)=>{
                    if(err) response.status(200).send({ message : 'cette operation de mise a jour ne peut etre effecué ' })
                    else  response.status(200).send({ message : 'operation de mise a jour effectué avec success'})
         } )

}

module.exports={ updateCommande, commandeForAClient, allCommandeUnProcess, allCommandFull, createCommande }