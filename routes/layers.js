var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var turf = require('@turf/turf');
var config = require('../config/config-main');
var villages = require('../data/village');

var conn_gis_str = require('../config/connect-gis');
var con_gis = mysql.createConnection(conn_gis_str);


router.get('/hospital', (req, res) => {
    var sql = "SELECT t.hoscode,t.hosname,t.hostype,t.lat,t.lon from chospital t ";
    sql += " WHERE t.lat is not NULL";
    sql += " AND t.provcode = ?";
    con_gis.query(sql, [config.provcode], (err, result, fields) => {
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

}); // hospital

router.get('/village/:p', (req, res) => {
    var p = req.params.p;

    var array = villages.features;
    var filtered = array.filter(function(feature) {
        return p.length >= 2 && feature.properties.DOLACODE.substring(0, p.length) === p;
    });
    res.json(filtered);

}); // village

router.get('/house/:d', (req, res) => {
    res.json({});
});





module.exports = router;