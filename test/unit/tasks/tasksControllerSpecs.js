(function() {
    'use strict';

    /* jasmine specs for credentials controllers go here
    describe('Tasks Controller', function() {
        var scope = {};
        var base_uri = 'carlos';
        var api_key = 'sarlanga';
        var configMock = {"mongolab": {"base_uri": base_uri, "api_key": api_key}};
        var tasksMock = {read:function(){}};


        beforeEach(function(){
            module('tasksModule');

            module(function($provide) {
                $provide.constant('config', configMock);
                $provide.factory('Tasks', tasksMock);
            });

            inject(function ($compile, $rootScope, $q) {
                scope = $rootScope.$new();
                spyOn(tasksMock, "read").and.returnValue($q.when([{ "id" : "565c94a8e4b03d453c995e48" , "description" : "Hacer el Commit inicial" , "status" : "WIP"},{ "id" : "565c94a8e4b03d453c9carlos" , "description" : "Hacer el Commit inicial" , "status" : "WIP"}]));
            });
        });

        describe('Startup', function() {
            it('Should startup credentials with empty set', inject(function($controller) {
                $controller('TasksController', {$scope:scope, Tasks: tasksMock});
                expect(scope.tasks.length).toBe(0);
            }));

            it('Should bind 2 credentials from service to scope', inject(function($controller) {
                $controller('TasksController', {$scope:scope, Tasks: tasksMock});
                scope.$digest();
                expect(scope.tasks.length).toBe(2);
            }));
        });
    });*/
})();
