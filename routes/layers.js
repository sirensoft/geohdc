var express = require('express');
var router = express.Router();
var turf = require('@turf/turf');
var config = require('../config/config-main');
var villages = require('../data/village');




router.get('/hospital', (req, res) => {
    var con_gis_db = req.con_gis_db;
    var sql = "SELECT t.hoscode,t.hosname,t.hostype,t.lat,t.lon from chospital t ";
    sql += " WHERE t.lat is not NULL";
    sql += " AND left(concat(t.provcode,t.distcode),?) = ?";
    con_gis_db.query(sql, [config.areacode.length, config.areacode], (err, result, fields) => {
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

router.get('/mooban', (req, res) => {
    var con_gis_db = req.con_gis_db;
    var collection = {
        "type": "FeatureCollection",
        "features": []
    };
    var sql = " select * from cmooban_gis where left(vill_code,?)=? order by vill_code asc";
    con_gis_db.query(sql, [config.areacode.length, config.areacode], (err, result) => {
            if (err) throw err;
            result.forEach(function(row) {
                collection.features.push({
                    type: 'Feature',
                    properties: {
                        vill_code: row.vill_code,
                        vill_no: row.vill_no,
                        vill_name: row.vill_name,
                        tambon: row.tambon,
                        amphur: row.amphur,
                        changwat: row.changwat,
                        'marker-symbol': 'village',
                        'marker-size': 'small',
                        'marker-color': '#DEB887',
                        title: 'ม.' + row.vill_no + ' ' + row.vill_name + ' ต.' + row.tambon
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [row.lon * 1, row.lat * 1]
                    }
                });
            }); //loop
            res.json(collection);

        }) //query


}); // mooban

// tambon
router.get('/tambon', (req, res) => {
    var con_gis_db = req.con_gis_db;
    var collection = {
        "type": "FeatureCollection",
        "features": []
    };
    var sql = "select * from ctambon_gis where left(fullcode,?) = ?";
    con_gis_db.query(sql, [config.areacode.length, config.areacode], (err, result) => {
        if (err) throw err;
        result.forEach(function(row) {
            collection.features.push({
                type: 'Feature',
                properties: {
                    "FULLCODE": row.FULLCODE,
                    "TAM_NAMT": row.TAM_NAMT,
                    "AMPUR": row.AMPUR,
                    "CHANGWAT": row.CHANGWAT,
                },
                geometry: {
                    type: 'Multipolygon',
                    coordinates: JSON.parse(row.COORDINATES)
                }
            });
        });
        res.json(collection);
    });
}); //tambon

//house
router.get('/house/:d', (req, res) => {
    res.json({});
}); //house





module.exports = router;