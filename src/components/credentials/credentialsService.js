(function() {
    'use strict';

    /* Tasks Services */
    angular.module('CredentialsModule')
        .factory('Credentials', ['config', '$http', function (config, $http) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
                readUser: function (username) {
                    //console.log(username);
                    var request = {
                        method: 'GET',
                        url: base_uri,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'apiKey': api_key,
                            'q': '{"username":"'+username+'"}'
                        }
                    };

                    return $http(request).then(function (response) {
                        return translate_idToid(response.data[0]);
                    });
                },
                calculatePassword: function(username) {
                    return CryptoJS.SHA256(username).toString().substr(0,5);
                }
            };

            function translate_idToid(user) {
                user.id = user._id.$oid;
                delete user._id;
                return user;
            }
        }]);
})();