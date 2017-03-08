
var YahooWeather = require('../REST/RestWeather.js');

describe('Using rest api', function () {
    it('Getting test data from rest service', function () {
        browser.ignoreSynchronization = true;
        browser.get('http://automatizacion.herokuapp.com/ctapasco/addDoctor');
        var weather = new YahooWeather();
        var specCity = weather.getCityWeather();
        expect(specCity).toContain("India");
        browser.sleep(500);
    });
});