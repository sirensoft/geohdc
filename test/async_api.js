var express = require('express');
var app = new express();


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

async function show(){
    var a = await delay(200);
    console.log(a);
}
show();




app.get('/', async function(req, res) {
    var a = await delay(10);
    res.send('OK...' + a);
});

app.listen(88);