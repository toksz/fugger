(function(window){

if (!!window.ResMap)
	return;

window.ResMap = function(options = [])
{
    this.options = options;
    this.data = {
        hq: {
            lon: 0,
            lat: 0,
            lvl: 1,
        },
        mines: [

        ]
    };
    this.last = {
        lat: 0,
        lon: 0
    };
    this.options.resColors = {
        "2": "#85493a",
        "20": "#8b8288",
        "3": "#5c5a56",
        "13": "#d87422",
        "8": "#161614",
        "10": "#010101",
        "53": "#c39265",
        "26": "#804031",
        "12": "#7d5c3b",
        "90": "#881235",
        "49": "#bba782",
        "15": "#a2a194",
        "14": "#b0842f",
        "81": "#c4b893",
    };
    this.map = {};
    this.map.tiles = {"osm":"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"};
    this.map.layers = [
        new L.TileLayer(
            this.map.tiles.osm,
            {
                maxZoom: 24,
                opacity: 0.5
            }
        )
    ];
    this.map.center = [0,0];
    this.map.zoom = '15';
    this.objects = [];
    this.dataurl = '/resources-game/personal/ajax.php?type=my_map_js';

    this.createMap = function() {
        $("#map").css("height",(window.innerHeight - 40) + 'px');
        this.map.map = new L.Map("map", {
            center: this.map.center,
            zoom: this.map.zoom,
            zoomSnap: 0.5,
            layers: this.map.layers
        });
        L.control.scale({maxWidth: 150}).addTo(this.map.map);
    };

    this.addObject = function(obj)
    {
        mapObject = obj.mapObject.addTo(this.map.map);
        object = {
            "lon": obj.lon,
            "lon": obj.lat,
            "type": obj.type,
            "data": obj.data,
            "mapObject": mapObject
        };
        this.objects.push(object);
    };

    this.addMine = function(obj)
    {
        mapObject = L.circle(
            [obj.lat,obj.lon],
            {
                radius: 14,
                weight: 0.5,
                color: this.options.resColors[obj.resource],
                fillColor: this.options.resColors[obj.resource],
                fillOpacity: 0.5
            }
        ).on('click',function(){
            window.resMap.last.lat = this._latlng.lat;
            window.resMap.last.lon = this._latlng.lng;
        });
        newObject = {
            "lon": obj.lon,
            "lon": obj.lat,
            "type": "mine",
            "data": obj,
            "mapObject": mapObject
        };
        this.addObject(newObject);
    };

    this.addHq = function(lon,lat,level)
    {
        rad = level*15+100;
        mapObject = L.circle(
            [lon,lat],
            {radius: rad}
        ).on('click',function(){console.log(["hq",this._latlng])});
        newObject = {
            "lon": lon,
            "lon": lat,
            "type": "hq",
            "mapObject": mapObject
        };
        this.addObject(newObject);
    };

    this.pageObjects = 0;
    this.parseObjects = function(jsonObjects) {
        if (typeof(jsonObjects.items) == "object") {
            for (i in jsonObjects.items) {
                this.addMine(jsonObjects.items[i]);
            }
        }
        if (!!jsonObjects.pages && jsonObjects.pages > this.pageObjects) {
            this.pageObjects += 1;
            this.getObjects();
        }
    };

    this.getObjects = function(type="mines")
    {
        $url = this.dataurl+"&get="+type+"&page="+this.pageObjects;
        $.ajax({
            'type': "POST",
            'global': false,
            'dataType': 'json',
            'url': $url,
            'data': { 'request': "", 'target': 'arrange_url', 'method': 'method_target' },
            'success': function (data) {
                window.resMap.parseObjects(data);
            }
        });
    };

};

})(window);
