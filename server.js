
const express = require('express')


const {DAOContext , pool }  =  require('./DB/dbConfig')


const body_parser = require('body-parser')
const fs=require('fs')

let app=express()

const ProduitRoutes = require('./routes/ProduitRoutes')
const ClientRoutes = require('./routes/ClientRoutes')
const CommandeRoutes = require('./routes/CommandeRoutes')
const PrommotionRoutes = require('./routes/PrommotionRoutes')
const { log } = require('console')

app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(body_parser.urlencoded({extended : false}))
app.use(body_parser.json())


app.use('/api/produit', ProduitRoutes)
app.use('/api/client', ClientRoutes)
app.use('/api/admin', AdminRoutes )
app.use('/api/commande', CommandeRoutes )
app.use('/api/prommotion', PrommotionRoutes)

app.get('/personnel', (request, response)=>{
/*        const liste_personnel = daoPersonne.allPersonnel()
        console.log( liste_personnel );*/
        const personne = new DaoPersonne()
        personne.allPersonnel() 
        
        pool.query('insert into personnel (nom, motdepasse, profil) values ($1, $2, $3) ', 
        ['janvier fevrier', 'mardi', 'mercredi'], (error, result)=>{
                if ( !error ) 
                   console.log( 'insertion reussite  :  ' + JSON.stringify(result));
                else {
                    console.log('erreur ' + error);
                }
        } )

} )

const PORT = process.env.PORT || 1330

app.listen(PORT)