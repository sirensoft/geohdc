var express = require('express');
var app = new express();
var db_config = require('../config/connect-gis');


var knex = require('knex')({
    client: 'mysql',
    connection: db_config
});


function delay(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (id > 0) {
                resolve('delay= ' + id * id);
            } else {
                reject;
            }
        }, 1000);
    });
}

delay(1).then(function(res) {
    console.log(res);
});

async function show() {
    var a = await delay(200);
    console.log(a);
}
show();



app.get('/', async function(req, res) {
    var a = await delay(10);
    res.send('OK...' + a);
});

app.get('/db', async(req, res) => {
    var sql = "select * from user";
    var rows = await knex.raw(sql);
    res.json(rows[0]);

});



app.listen(88);