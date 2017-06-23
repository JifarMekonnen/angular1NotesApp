'use strict';

describe('myApp.view1 module', function () {
    beforeEach(module('myApp.view1'));
    describe('view1 controller', function(){
        var $controller,
            $scope;
        beforeEach(inject(function (_$controller_, $rootScope) {
            $scope = $rootScope.$new();
            $controller = _$controller_('View1Ctrl', {
                $scope: $scope
            });
        }));
        it('should init ctrl', function () {
            expect($controller).toBeDefined();
        });
        it('should init $scope', function () {
            expect($scope.notes.length).toBe(0);
            expect($scope.status).toBe('all');
        });
        it('should add notes', function () {
            $scope.item = "hello";
            $scope.add();
            expect($scope.notes.length).toBe(1);
            $scope.item = "hello2";
            $scope.add();
            expect($scope.notes.length).toBe(2);
        });
        it('should remove a note', function () {
            $scope.item = "note1";
            $scope.add();
            expect($scope.notes.length).toBe(1);
            $scope.remove($scope.notes[0]);
            expect($scope.notes.length).toBe(0);
        });
        it('should toggle a note', function () {
            $scope.item = "note2";
            $scope.add();
            expect($scope.notes[0].done).toBe(false);
            $scope.toggle($scope.notes[0]);
            expect($scope.notes[0].done).toBe(true);
            $scope.toggle($scope.notes[0]);
            expect($scope.notes[0].done).toBe(false);
        });
        it('should filter by done', function () {
            $scope.done();
            expect($scope.status).toBe('done');
        });
        it('should filter by undone', function () {
            $scope.undone();
            expect($scope.status).toBe('undone');
        });
        it('should filter by all', function () {
            $scope.all();
            expect($scope.status).toBe('all');
        });

    });
    describe('view1 filter', function(){
        var $filter;
        var notes=[{name:"note1",done:false},{name:"note2",done:false},{name:"note3",done:true}]
        beforeEach(inject(function (_$filter_) {
          $filter = _$filter_('filterByStatus');
        }));
        it('should return all notes',function () {
            expect($filter(notes,'all').length).toBe(3);
        });
        it('should return only done notes',function () {
            expect($filter(notes,'done').length).toBe(1);
        });
        it('should return only undone notes',function () {
            expect($filter(notes,'undone').length).toBe(2);
        });
    });
});