var nest = require('unofficial-nest-api'),
    util = require('util');

var username    = process.env.nestUname,
    password    = process.env.nestPword,
    temp        = process.env.temp;


nest.login(username, password, function (err, data) {
    if (err) {
        console.log(err.message);
        process.exit(1);
        return;
    }

    console.log('Logged in.');

    nest.fetchStatus(function (data) {
        for (var deviceId in data.device) {
            if (data.device.hasOwnProperty(deviceId)) {
                var device = data.shared[deviceId];
                console.log(util.format("%s [%s], Current temperature = %d C target=%d C",
                    device.name, deviceId,
                    device.current_temperature,
                    device.target_temperature));
            }
        }
        var ids = nest.getDeviceIds();
        nest.setTargetTemperatureType(ids[0], 'heat');
        nest.setTemperature(temp);
    });
});
