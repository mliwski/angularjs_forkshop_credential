(function() {
    'use strict';

    /* App config*/
    angular.module('configModule', [])
        .constant('config', {
            "mongolab": {
                "base_uri": "https://api.mongolab.com/api/1/databases/todo/collections/forkshop_credentials",
                "api_key": "eaOtzm6_MKJ5rsGsx_yFv5uGTuqnoxXV"
            }
        });
})();