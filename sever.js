const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js');


const app = express();
const PORT =  8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api', routes);

app.use('*', (req, res) =>{
    res.status(404).send(`error: ruta ${req.url} metodo ${req.method} no es autorizado`);
});
const connectedServer = app.listen(PORT, ()=> {
    console.log(`Listenign on port http://localhost:${PORT}`);
});
  
connectedServer.on('error', (error) => {
    console.error('Error: ', error);
});
