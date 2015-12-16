(function() {
    'use strict';
    describe('IMPLEMENTAR', function() {
        
    });
/*
    //TODO Make better each property test (test the reject reason)
    describe('Tasks Service', function() {
        var scope = {};
        var base_uri = 'carlos';
        var api_key = 'sarlanga';
        var configMock = {"mongolab": {"base_uri": base_uri, "api_key": api_key}};

        beforeEach(function(){
            module('tasksModule');

            module(function($provide) {
                $provide.constant('config', configMock);
            });

            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });
        });

        describe('Create method', function() {
            it('Should translate create service to http POST method', inject(function (Tasks, $httpBackend) {
                var taskToCreate = {"description": "Hacer el commit inicial"};

                $httpBackend.when('POST', configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key)
                    .respond({
                        "_id": {"$oid": "565c94a8e4b03d453c995e48"},
                        "description": "Hacer el commit inicial",
                        "status": "WIP"
                    });

                Tasks.create(taskToCreate).then(function (createdTask) {
                    expect(createdTask.id).not.toBeUndefined();
                });

                $httpBackend.flush();
            }));

            it('Should apply status WIP to all new credentials', inject(function(Tasks, $httpBackend) {
                var taskToCreate = {"description" : "Hacer el commit inicial"};

                $httpBackend.when('POST', configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key)
                    .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : taskToCreate.description , "status" : "WIP"});

                Tasks.create(taskToCreate);

                var taskWithWIP = _.clone(taskToCreate);
                taskWithWIP.status = 'WIP';
                $httpBackend.expectPOST(configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key, taskWithWIP);
                $httpBackend.flush();
            }));

            it('Should create a task with an object with description property only', inject(function(Tasks) {
                var taskToCreate = {"description" : "Hacer el commit inicial", "carlos": "WIP"};
                var error = "";

                Tasks.create(taskToCreate).catch(function (reason) {
                    error = reason;
                });

                scope.$digest();
                expect(error).not.toBe("");
            }));

            it('Should create a task with description not empty', inject(function(Tasks) {
                var taskToCreate = {"description" : ""};
                var error = "";

                Tasks.create(taskToCreate).catch(function (reason) {
                    error = reason;
                });

                scope.$digest();
                expect(error).not.toBe("");
            }));
        });

        describe('Read method', function() {
            it('Should translate read service to http GET method', inject(function(Tasks, $httpBackend) {
                $httpBackend.when('GET', configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key)
                    .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

                Tasks.read().then(function(items){
                    expect(items.length).toBe(1);
                });

                $httpBackend.flush();
            }));

            it('Should translate mongodb _id to id', inject(function(Tasks, $httpBackend) {
                $httpBackend.when('GET', configMock.mongolab.base_uri + '?apiKey=' + configMock.mongolab.api_key)
                    .respond([ { "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

                Tasks.read().then(function(items){
                    expect(items[0]._id).toBe(undefined);
                    expect(items[0].id).toBe("565c94a8e4b03d453c995e48");
                });

                $httpBackend.flush();
            }));
        });

        describe('Update method', function() {
            it('Should translate update service to http PUT', inject(function(Tasks, $httpBackend){
                var taskToUpdate = { "id" : "565c94a8e4b03d453c995e48" , "description" : "Hacer el Commit inicial" , "status" : "WIP"};

                $httpBackend.when('PUT', configMock.mongolab.base_uri+"/"+taskToUpdate.id + '?apiKey=' + configMock.mongolab.api_key)
                    .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el Commit inicial" , "status" : "WIP"});

                Tasks.update(taskToUpdate).then(function(updatedTask){
                    expect(updatedTask.id).not.toBeUndefined();
                });

                $httpBackend.flush();
            }));

            it('Should translate _id from response to id', inject(function(Tasks, $httpBackend){
                var taskToUpdate = { "id" : "565c94a8e4b03d453c995e48" , "description" : "Hacer el Commit inicial" , "status" : "WIP"};

                $httpBackend.when('PUT', configMock.mongolab.base_uri+"/"+taskToUpdate.id + '?apiKey=' + configMock.mongolab.api_key)
                    .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el Commit inicial" , "status" : "WIP"});

                Tasks.update(taskToUpdate).then(function(updatedTask){
                    expect(updatedTask.id).not.toBeUndefined();
                    expect(updatedTask._id).toBeUndefined();
                });

                $httpBackend.flush();
            }));

            it('Should translate id property to http param', inject(function(Tasks, $httpBackend){
                var taskToUpdate = { "id": "565c94a8e4b03d453c995e48" , "description" : "Hacer el Commit inicial" , "status" : "WIP"};

                $httpBackend.when('PUT', configMock.mongolab.base_uri+"/" + taskToUpdate.id + '?apiKey=' + configMock.mongolab.api_key)
                    .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el Commit inicial" , "status" : "WIP"});

                Tasks.update(taskToUpdate);

                $httpBackend.expectPUT(configMock.mongolab.base_uri+"/" + taskToUpdate.id + '?apiKey=' + configMock.mongolab.api_key);
                $httpBackend.flush();
            }));

            it('Should remove id property from task object', inject(function(Tasks, $httpBackend){
                var taskToUpdate = { "id": "565c94a8e4b03d453c995e48" , "description" : "Hacer el Commit inicial" , "status" : "WIP"};

                $httpBackend.when('PUT', configMock.mongolab.base_uri+"/" + taskToUpdate.id + '?apiKey=' + configMock.mongolab.api_key)
                    .respond({ "_id" : { "$oid" : "565c94a8e4b03d453c995e48"} , "description" : "Hacer el Commit inicial" , "status" : "WIP"});

                Tasks.update(taskToUpdate).then(function(updatedTask){
                    expect(updatedTask.id).not.toBeUndefined();
                });

                $httpBackend.flush();
            }));

            it('Should update a task with an object with id, description and status property only', inject(function(Tasks) {
                var taskToUpdate = {"id":"565c94a8e4b03d453c995e48", "description" : "Hacer el commit inicial", "status":"WIP", "carlos": "WIP"};
                var error = "";

                Tasks.create(taskToUpdate).catch(function (reason) {
                    error = reason;
                });

                scope.$digest();
                expect(error).not.toBe("");
            }));

            it('Should update a task with id not empty', inject(function(Tasks) {
                var taskToUpdate = {"description" : "", "status": "DONE"};
                var error = "";

                Tasks.create(taskToUpdate).catch(function (reason) {
                    error = reason;
                });

                scope.$digest();
                expect(error).not.toBe("");
            }));

            it('Should update a task with description not empty', inject(function(Tasks) {
                var taskToUpdate = {"description" : "", "status": "DONE"};
                var error = "";

                Tasks.create(taskToUpdate).catch(function (reason) {
                    error = reason;
                });

                scope.$digest();
                expect(error).not.toBe("");
            }));

            it('Should update a task with status not empty', inject(function(Tasks) {
                var taskToUpdate = {"description" : "Carlos", "status": ""};
                var error = "";

                Tasks.update(taskToUpdate).catch(function (reason) {
                    error = reason;
                });

                scope.$digest();
                expect(error).not.toBe("");
            }));
        });

        describe('Delete method', function() {
            it('Should translate delete service to http DELETE', inject(function(Tasks, $httpBackend){
                var taskIdToDelete = "565c94a8e4b03d453c995e48";

                $httpBackend.when('DELETE', configMock.mongolab.base_uri+"/"+taskIdToDelete + '?apiKey=' + configMock.mongolab.api_key)
                    .respond([ { "_id" : { "$oid" : taskIdToDelete} , "description" : "Hacer el workshop" , "status" : "WIP"} ]);

                Tasks.delete(taskIdToDelete).then(function(deletedTask){
                    expect(deletedTask.id).not.toBeUndefined();
                });

                $httpBackend.flush();
            }));
        });
    });*/
})();
