
const pg=require('pg')


/* const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: 'E_COMMERCE',
  password: 'lessorciers',
  port: 5432
})  */



class DAOContext {

 static init(){

    const pool = new pg.Pool({
        user: "postgres",
        host: "localhost",
        database: "E_COMMERCE",
        password: "lessorciers",
        port: 5432
      })

    return pool

}
  
  }


  const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "E_COMMERCE",
    password: "lessorciers",
    port: 5432
  })

module.exports= pool  

// const pool = new pg.Pool({