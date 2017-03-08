var rest = require('restler');
var defered = protractor.promise.defer();
var YahooWeather = function () {
    this.getCityWeather = function () {
        rest.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hyderabad%2C%20Tel%2C%20india%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').on('complete', function (result) {
            if (result instanceof Error) {
                defered.reject(result.message)
            } else {
                defered.fulfill(result.query.results.channel.location.country);
            }
        });
        return defered.promise;
    }
}
module.exports = YahooWeather;