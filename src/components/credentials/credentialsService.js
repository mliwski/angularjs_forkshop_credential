(function() {
    'use strict';

    /* Tasks Services */
    angular.module('CredentialsModule')
        .factory('Credentials', ['config', '$http', function (config, $http) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
                readUser: function (username) {
                    console.log(username);
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
                    var hash = CryptoJS.HmacSHA512(username, "Voy a extrañar al pela");
                    return  hash.toString().substr(3,5);
                }
            };

            function translate_idToid(user) {
                user.id = user._id.$oid;
                delete user._id;
                return user;
            }
        }]);
})();