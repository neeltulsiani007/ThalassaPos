
var sql = require("mssql");

const config ={
    user: 'SA',
    password: 'Password123',
    database: 'Restaurant',
    server: 'localhost',
    options:{
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
    },
}



const connect = ()=>{
sql.connect(config,  function (err) {
    
    if (err) {console.log(err)};
    console.log('DB connected');
})
}
module.exports = connect;