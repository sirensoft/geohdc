var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var turf = require('@turf/turf');
var config = require('../config/config-main');


var conn_gis_str = require('../config/connect-gis');
var con_gis = mysql.createConnection(conn_gis_str);

router.get('/', (req, res) => {
    res.render('pop', { session: req.session });
});

router.get('/pop-gis', (req, res) => {
    var collection = {
        "type": "FeatureCollection",
        "features": []
    };
    var sql = "select * from pop_tambon_gis";
    con_gis.query(sql, function(err, result) {
        if (err) throw err;
        result.forEach(function(row) {
            collection.features.push({
                type: 'Feature',
                properties: {
                    "FULLCODE": row.FULLCODE,
                    "TAM_NAMT": row.TAM_NAMT,
                    "AMPUR": row.AMPUR,
                    "CHANGWAT": row.CHANGWAT,
                    "TOTAL": row.TOTAL,
                    "AGGING": row.AGGING
                },
                geometry: {
                    type: 'MultiPolygon',
                    coordinates: JSON.parse(row.COORDINATES)
                }
            });
        });

        res.json(collection);
    });

});







module.exports = router;