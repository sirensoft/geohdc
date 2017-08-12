var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var turf = require('@turf/turf');

var conn_hdc_str = require('../config/connect-hdc');
var conn_gis_str = require('../config/connect-gis');
var con_hdc = mysql.createConnection(conn_hdc_str);
var con_gis = mysql.createConnection(conn_gis_str);

router.get('/hospital', (req, res) => {
    var sql = " SELECT h.hoscode,h.hosname,h.hostype,t.lat,t.lon FROM geojson t ";
    sql += " INNER JOIN config c ON LEFT(t.areacode,2) = c.id";
    sql += " LEFT JOIN chospital h on h.hoscode = t.hcode ";
    sql += " WHERE t.areatype = 4 ";
    con_gis.query(sql, (err, result, fields) => {
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

module.exports = router;