var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var turf = require('@turf/turf');

var conn_hdc_str = require('../config/connect-hdc');
var conn_gis_str = require('../config/connect-gis');
var con_hdc = mysql.createConnection(conn_hdc_str);
var con_gis = mysql.createConnection(conn_gis_str);

var village = require('../data/village');

var con_hdc;

function handleDisconnect() {
    con_hdc = mysql.createConnection(conn_hdc_str);


    con_hdc.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000);
        }
    });
    con_hdc.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
};

handleDisconnect();

router.get('/hospital', (req, res) => {
    var sql = " SELECT h.hoscode,h.hosname,h.hostype,t.lat,t.lon FROM geojson t ";
    sql += " INNER JOIN sys_config c ON LEFT(t.areacode,2) = c.provincecode";
    sql += " LEFT JOIN chospital h on h.hoscode = t.hcode ";
    sql += " WHERE t.areatype = 4 ";
    con_hdc.query(sql, (err, result, fields) => {
        var collection = {
            "type": "FeatureCollection",
            "features": []
        };
        result.forEach(function(row) {
            var hosname = row.hosname.replace("โรงพยาบาลส่งเสริมสุขภาพตำบล", 'รพ.สต.');
            hosname = hosname.replace("สถานีอนามัย", 'สอ.');
            collection.features.push({
                "type": "Feature",
                "properties": {
                    hosname: hosname,
                    hostype: row.hostype,
                    'marker-symbol': 'hospital',
                    'marker-color': '#0000FF',
                    'marker-size': 'small'
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [row.lon * 1, row.lat * 1]
                }
            });
        });

        res.json(collection);

    });

});

router.get('/village/:p', (req, res) => {
    var p = req.params.p;

    var array = village.features;
    var filtered = array.filter(function(feature) {
        return p.length >= 2 && feature.properties.DOLACODE.substring(0, p.length) === p;
    });
    res.json(filtered);

});

module.exports = router;