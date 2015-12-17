(function() {
    'use strict';

    /* Tasks Services */
    angular.module('CredentialsModule')
        .factory('Credentials', ['config', '$http', function (config, $http) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
                readUser: function (username) {
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
                        if(response.data.length > 0) {
                            return translate_idToid(response.data[0]);
                        } else {
                            return "";
                        }

                    });
                },
                calculatePassword: function(username) {
                    var hash = CryptoJS.SHA256(username);
                    console.log(hash.toString(CryptoJS.enc.Hex));
                    return hash.toString(CryptoJS.enc.Hex).substr(4,5);

                }
            };

            function translate_idToid(user) {
                    user.id = user._id.$oid;
                    delete user._id;
                    return user;
            }
        }]);
})();