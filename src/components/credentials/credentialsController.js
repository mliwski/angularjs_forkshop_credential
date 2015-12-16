(function() {
    'use strict';

    /* Credentials Controllers */
    angular.module('CredentialsModule')
        .controller('CredentialsController', ['$scope', '$q', 'Credentials', function ($scope, $q, Credentials) {
            $scope.username = "";
            $scope.password = "";
            $scope.credentialsOK = false;
            $scope.loading = false;

            $scope.validateCredentials = function(username) {
                return toggleLoading(username)
                    .then(readUser)
                    .then(verifyPassword)
                    .then(saveScopeVariables)
                    .then(toggleLoading)
                    .catch(function() {
                        $scope.loading = false;
                        $scope.password = 'NOP';
                    });

                function readUser(username) {
                    return Credentials.readUser(username);
                }

                function verifyPassword(user) {
                    if(user.password === Credentials.calculatePassword(username)) {
                        return $q.resolve(user);
                    } else {
                        return $q.reject('Calculated password does not match stored password');
                    }
                }

                function saveScopeVariables(user) {
                    $scope.password = user.password;
                    console.log(CryptoJS.SHA256(user.password));
                    $scope.credentialsOK = true;
                    return $q.resolve(user);
                }

                function toggleLoading(input) {
                    $scope.loading = !$scope.loading;
                    return $q.resolve(input);
                }
            };
        }]);
})();
