$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoidGVobm5uIiwiYSI6ImNpZzF4bHV4NDE0dTZ1M200YWxweHR0ZzcifQ.lpRRelYpT0ucv1NN08KUWQ';
    var map = L.mapbox.map('map').setView([16, 100], 9);
    var hash = L.hash(map);

    //base-map
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=th', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleStreet = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=th', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var osmStreet = L.mapbox.tileLayer('mapbox.streets');

    var baseMap = {
        'OSM-ถนน': osmStreet,
        'Google-ถนน': googleStreet.addTo(map),
        'Google-ผสม': googleHybrid,
        'Google-ดาวเทียม': googleSat,
        //'ไม่แสดง': {}

    };
    //end-base

    var availableTags = [];
    $('#txt-find-hos').click(function(e) {
        $(this).select();
    });

    //hospital
    var hospitalLayer = L.featureGroup();
    var hos_data = L.mapbox.featureLayer();
    hos_data.loadURL('/layers/hospital').on('ready', (e) => {
        map.fitBounds(e.target.getBounds());
        e.target.eachLayer((layer) => {
            var hosname = layer.feature.properties.hosname;
            availableTags.push(hosname);
            layer.bindPopup(hosname);
            if (layer.feature.properties.hostype === '05') {
                layer.setIcon(L.mapbox.marker.icon({
                    'marker-size': 'large',
                    'marker-symbol': 'h',
                    'marker-color': '#B22222'
                }));
            }
            if (layer.feature.properties.hostype === '07') {
                layer.setIcon(L.mapbox.marker.icon({
                    'marker-size': 'medium',
                    'marker-symbol': 'h',
                    'marker-color': '#32CD32'
                }));
            }
            layer.addTo(hospitalLayer);
        });

        $("#txt-find-hos").autocomplete({
            source: availableTags
        })


        $('#frm-find-hos').submit((e) => {
            //$('#navbarsGisDefault').toggle();
            var find = $('#txt-find-hos').val();
            hos_data.eachLayer((layer) => {
                if (layer.feature.properties.hosname === find) {
                    map.setZoom(16);
                    map.panTo(layer.getLatLng());
                    layer.openPopup();

                    return;
                }
            });

        });
    }); //end hospital ready

    //village
    var villLages = L.mapbox.featureLayer();
    villLages.loadURL('/layers/village/65').on('ready', function(e) {
        var layers = e.target;
        layers.eachLayer(function(layer) {
          
        })
    });

    //end village

    //ขอบเขตการปกครอง
    var admin_boder = L.tileLayer.wms('http://tile.gistda.or.th/geoserver/wms', {
        layers: "flood:L0503_gistda_50k",
        transparent: true,
        format: 'image/png',
        tiles: true,
        attribution: 'GISTDA @ Copyright 2016',

    });

    //แผนที่น้ำท่วมรอบ 7 วัน
    var flood_update = L.tileLayer.wms('http://tile.gistda.or.th/geoserver/flood/wms', {
        layers: "floodarea_tambon",
        transparent: true,
        format: 'image/png',
        tiles: true,
        attribution: 'GISTDA @ Copyright 2016',

    });

    //ฝน
    var rain = L.layerGroup();
    var base_url = 'http://rain.tvis.in.th/';
    var radar = 'NongKham';
    var radars = '["NongKham","KKN","PHS","CRI","UBN","OMK"]';
    var latlng_topright = '["15.09352819610486,101.7458188486135","18.793550,105.026265","19.094393,102.475537","22.305437,102.143387","17.558854,107.095363","19.904425,100.770048"]';
    var latlng_bottomleft = '["12.38196058009694,98.97206140040996","14.116192,100.541459","14.411350,97.983591","17.596297,97.611690","12.918883,102.646771","15.630408,96.114592"]';
    var d = new Date();
    var time = d.getTime();
    //console.log(time);
    radars = JSON.parse(radars);
    latlng_topright = JSON.parse(latlng_topright);
    latlng_bottomleft = JSON.parse(latlng_bottomleft);
    var urllast;
    var boundlast;
    $.each(radars, function(key, value) {
        var top_right = latlng_topright[key].split(",");
        var bottom_left = latlng_bottomleft[key].split(",");

        var imageUrl = base_url + "/output/" + value + ".png?" + time,
            imageBounds = [
                [top_right[0], top_right[1]],
                [bottom_left[0], bottom_left[1]]
            ];
        L.imageOverlay(imageUrl, imageBounds).addTo(rain).setOpacity(0.95);
    });
    //จบฝน


    L.control.layers(baseMap, {
        'โรงพยาบาล': hospitalLayer.addTo(map),
        'เขตการปกครอง': admin_boder.addTo(map),
        'ที่ตั้งหมู่บ้าน': villLages,
        'น้ำท่วมขัง': flood_update,
        'เรดาห์น้ำฝน': rain
    }).addTo(map);
});