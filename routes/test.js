var express = require('express');
var router = express.Router();

var turf = require('@turf/turf');

var json2csv = require('json2csv');

var json_village = require('../data/village');

router.get('/', (req, res) => {
    res.render('test');
});
router.get('/test2', (req, res) => {
    res.render('test2');
});

router.get('/json', (req, res) => {

    var p = req.query.p;
    var array = json_village.features;
    var filtered = array.filter(function(feature) {

        return feature.properties.DOLACODE.substring(0, p.length) === p;

    });
    res.json(filtered);

});

router.get('/vill', (req, res) => {
    var p = req.query.p;
    res.render('test');


});


router.get('/vill/get', (req, res) => {

    var array = json_village.features;
    var filtered = array;
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
    });

    var csv = json2csv({ data: datas, quotes: '' });
    res.attachment('mooban.txt');
    res.status(200).send(csv);

});

router.get('/vill/get/:p', (req, res) => {
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
    });

    var csv = json2csv({ data: datas, quotes: '' });
    res.attachment('mooban.txt');
    res.status(200).send(csv);

});

router.get('/chart', function(req, res) {


    var data = [{
        name: 'DHF',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'DF',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'DSS',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Zika',
        data: [15000, 10000, 7988, 12169, 15112, 22452, 34400, 34227]
    }];



    res.json(data);


});

module.exports = router;