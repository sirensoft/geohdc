var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var turf = require('@turf/turf');

var json2csv = require('json2csv');



var conn_hdc_str = require('../config/connect-hdc');
var conn_gis_str = require('../config/connect-gis');
var con_hdc = mysql.createConnection(conn_hdc_str);
var con_gis = mysql.createConnection(conn_gis_str);
var json_village = require('../data/village');

router.get('/json/:p', (req, res) => {
    var p = req.params.p;
    var array = json_village.features;
    var filtered = array.filter(function(feature) {

        return feature.properties.DOLACODE.substring(0, p.length) === p;

    });
    res.json(filtered);

});

router.get('/vill', (req, res) => {

    res.render('test');


});



router.get('/get/:p', (req, res) => {
    var p = req.params.p;
    var array = json_village.features;
    var filtered = array.filter(function(feature) {

        return feature.properties.DOLACODE.substring(0, p.length) === p;

    });
    var datas = [];

    filtered.forEach(function(row) {
        var vill_code = row.properties.DOLACODE,
            vill_no = row.properties.VILL_NO,
            vill_name = row.properties.MUBAN,
            tambon = row.properties.TAMBOL,
            amphur = row.properties.AMPHOE,
            changwat = row.properties.CHANGWAT,
            lat = row.geometry.coordinates[1],
            lon = row.geometry.coordinates[0];

        datas.push({
            'vill_code': vill_code,
            'vill_no': vill_no,
            'vill_name': vill_name,
            'tambon': tambon,
            'amphur': amphur,
            'changwat': changwat,
            'lat': lat,
            'lon': lon
        });
        //datas.push([vill_code, vill_no, vill_name, tambon, amphur, changwat, lat, lon])

    });

    var csv = json2csv({ data: datas, quotes: '' });

    res.attachment('mooban.txt');
    res.status(200).send(csv);

});

module.exports = router;