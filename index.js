// NPM packages
const express = require('express');
const request = require('request');

// Config
const LYD_API_URL = 'https://lydapi.pkfln.io';
const LYD_API_KEY = '';

// App
const app = express();

let getFactionColor = (faction) => {
    switch (faction) {
        case 'Grove Street Families':
            return '#008700';

        case 'Triaden':
            return '#000087';

        case 'Yakuza':
            return '#870000';

        case 'Ballas Family':
            return '#870087';

        case 'OutlawZ':
            return '#871d00';

        case 'Varrios Los Aztecas':
            return '#008787';

        case 'La Cosa Nostra':
            return '#878787';

        case 'Los Santos Vagos':
            return '#878700';
    }
};

app.set('views', 'static');
app.set('view engine', 'ejs');
app.get('*', (req, res) => {
    request(LYD_API_URL + '/map?apikey=' + LYD_API_KEY, (err, response, body) => {
        body = JSON.parse(body);

        let zones = [];

        body.gangFightZones.forEach((zone) => {
            let index =  zones.map(_zone => _zone.title).indexOf(zone.owner);

            if (zone.owner) {
                if (index < 0)
                    zones.push({
                        title: zone.owner,
                        value: 1,
                        color: getFactionColor(zone.owner)
                    });
                else
                    zones[index].value++;
            }
        });

        res.render('index', { zones });
    });
});
app.listen(7374, () => console.log('App listening on :7374'));
