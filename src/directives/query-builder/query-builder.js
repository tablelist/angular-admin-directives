angular.module('directives.query-builder', [])

    /* =========================================================================
     *  Directive
     * ========================================================================= */

    /* config = {
     *   properties: fields you can query by
     *   comparators: extra special comparators to add
     *   fetchData: function used to fetch data
     *   fetchCsv: function user to fetch csv data
     *
     *   fetchDataCallback (optional): function to run when data is fetched
     *   defaultQuery (optional):
     *   {
     *      key: name of key
     *      value: value to query
     *   }
     * }
     *
     * data = set to query response
     * dataTotals (optional) = set to query totals response
     */

    .directive('queryBuilder', function() {
        return {
            restrict: 'E',
            templateUrl: '/directives/query-builder/query-builder.tpl.html',
            controller: "QueryBuilderCtrl",
            scope: {
              config: '=',
            },
        };
    })

    /* =========================================================================
     *  Default Properties
     * ========================================================================= */

    .constant('DEFAULTS', {
        properties: [{
            key: "_id",
            name: "ID",
            dataType: "string"
        }]
    })

    /* =========================================================================
     *  Controller
     * ========================================================================= */

    .controller('QueryBuilderCtrl', ['$scope', 'QueryBuilderService', '$location', 'DEFAULTS', function($scope, QueryBuilderService, $location, DEFAULTS) {
        // TODO: Abstract
        // $scope.debug = TL.config.env != 'PROD';

        // Built mongo query
        $scope.mongoQuery = {};
        // Array of clauses. Used for:
        //  -  Constructing Mongo query
        //  -  Displaying current query state
        $scope.query = [];
        // Object contains the details for each
        // parameter in the current clause
        $scope.currentClause = {};
        // Available comparators for current clause property selected
        $scope.currentComparators = [];
        // Whether to hide text box
        $scope.hideValueTextBox = false;

        // What property users list gets sorted by
        var defaultSort = {
            property: "created",
            ascending: false
        };
        $scope.sortOrder = "";
        $scope.sortBy = defaultSort

        // query builder configuration
        var config = $scope.config;
        console.log(DEFAULTS)
        var properties = _.union(DEFAULTS.properties, config.properties);
        var comparators = QueryBuilderService.getDefaultComparators();

        // Create query builder options
        $scope.options = {
            // Selectable properties
            properties : properties,
        }

        // Setup ref comparators
        if (config.refComparators) {
            angular.forEach(config.refComparators, function (value) {
                if (value.resources) {
                    if (value.resources.$promise) {
                        value.resources.$promise.then(function() {
                            comparators = comparators.concat(getRefComparators(value.resources, value.refType));
                        });
                    }
                }
            })
        }

        // Setup regular comparators
        if (config.comparators) {
            comparators = comparators.concat(config.comparators);
        }

        // pull in query params
        readLocationQuery();

        /******************************
            Query Form Manipulation
        *******************************/

        $scope.propertySelected = function(property) {
            updateCurrentComparators(property);
            updateTextField(property)
        }

        function updateCurrentComparators (property) {
            var type = property.dataType;
            var match = { dataType: type };
            if (property.refType) match.refType = property.refType;

            // look through all available comparators
            $scope.currentComparators = _.where(comparators, match);
            $scope.currentClause.comparator = $scope.currentComparators[0];
            $('.clause-text-field')[0].focus();
            $scope.currentComparators = $scope.currentComparators.concat(_.where(comparators, { key : property.key }));
        }

        function updateTextField (property) {
            $scope.hideValueTextBox = property &&
                (property.hideText || property.dataType == 'boolean' || property.dataType == 'ref')
        }

        $scope.lastWeek = function() {
            var todayDiary = todayDate();
            var lastSunday = moment(todayDiary).day(-7) // last sunday = 0 - 7
            var thisMonday = moment(todayDiary).day(1) // this monday = 1
            addDateAfter(lastSunday.toDate());
            addDateBefore(thisMonday.toDate());
            // set the query
            setQuery($scope.query, $scope.sortBy);
        }

        $scope.thisWeek = function() {
            var todayDiary = todayDate();
            var thisSunday = moment(todayDiary).day(0) // this sunday = 0
            var nextMonday = moment(todayDiary).day(8) // next monday = 1 + 7
            addDateAfter(thisSunday.toDate());
            addDateBefore(nextMonday.toDate());
            // set the query
            setQuery($scope.query, $scope.sortBy);
        }

        function addDateAfter(date) {
            addDateClause(date, false);
        }

        function addDateBefore(date) {
            addDateClause(date, true);
        }

        function addDateClause(date, before) {
            var beforeComp = { "name":"before","expression":"$lt","dataType":"date" };
            var afterComp = { "name":"after","expression":"$gt","dataType":"date" };
            var comparator = (before) ? beforeComp : afterComp;

            var clause = {
                "property": {
                    "key":"date","name":"Date","dataType":"date"
                },
                "comparator": comparator,
                "value": date
            };

            // lets check if currently have a date clause and update it
            var existingDate = false;
            angular.forEach($scope.query, function (queryItem) {
                var checkName = (before) ? "before" : "after"
                if (queryItem.comparator &&
                    queryItem.comparator.dataType === 'date' &&
                    queryItem.comparator.name === checkName) {
                    // update it
                    existingDate = true;
                    queryItem.value = date;
                }
            })
            if (!existingDate) $scope.query.push(clause);
        }


        // Adding a new part to the query
        $scope.addToQuery = function() {
            $scope.query.push($scope.currentClause);
            // Reset clause in form
            $scope.currentClause = {};

            setQuery($scope.query, $scope.sortBy);
        }

        $scope.removeFromQuery = function(index){
            $scope.query.splice(index, 1);
            setQuery($scope.query, $scope.sortBy);
        }

        $scope.setSortByProperty = function(key) {
            $scope.sortBy.property = key;
            setQuery($scope.query, $scope.sortBy);
        }

        $scope.setSortByAscending = function(asc) {
            $scope.sortBy.ascending = asc;
            setQuery($scope.query, $scope.sortBy);
        }

        function setQuery(query, sortBy) {
            $scope.mongoQuery = QueryBuilderService.buildMongoQuery(query);
            $scope.sortOrder = QueryBuilderService.buildSortOrder(sortBy);
            updateLocationQuery(query, sortBy);
            config.queryUpdatedCallback($scope.mongoQuery, $scope.sortOrder);
        }

        function readLocationQuery() {
            var params = $location.search();
            var query = (params.query) ? params.query : null;
            var sortBy = (params.sortBy) ? params.sortBy : null;

            if (query && sortBy) {
                try {
                    // parse the query object
                    query = JSON.parse(query);
                    sortBy = JSON.parse(sortBy);
                } catch (err) {
                    console.error('Invalid query params');
                    query = null;
                    sortBy = null;
                }
            }
            if (query && sortBy) {
                $scope.query = query;
                $scope.sortBy = sortBy;
                setQuery(query, sortBy);
            }
        }

        function updateLocationQuery(query, sortBy) {
            $location.search({
                query: JSON.stringify(query),
                sortBy: JSON.stringify(sortBy)
            })
        }

        function getRefComparators(list, type) {
            var comparators = [];
            angular.forEach(list, function (value) {
                comparators.push({
                    "name": value.name,
                    "expression": value._id,
                    "refType": type,
                    "dataType": "ref"
                })
            })
            return comparators;
        }

        function todayDate () {
            var utcDate = moment.utc();

            if (utcDate.hours() < 6) {
                utcDate.date(utcDate.date() -1);
            }
            // utcDate = moment([utcDate.year(), utcDate.months])
            utcDate.hours(6)
            utcDate.minutes(0);
            utcDate.seconds(0);
            utcDate.milliseconds(0);

            return utcDate;
        }

    }])

    /* =========================================================================
     *  Service
     * ========================================================================= */

    .service('QueryBuilderService', function() {

        this.buildMongoQuery = function(queryData) {
            var _this = this;

            var mongoQuery = {};
            if (queryData && Object.keys(queryData).length > 0) {
                mongoQuery = {
                    $and : []
                };
                _.each(queryData, function(clause) {
                    mongoQuery['$and'].push(_this.buildMongoClause(clause));
                })
            }
            return mongoQuery;
        }

        this.buildMongoClause = function(clause) {

            var dataType = clause.property.dataType;
            var mongoClause = {};

            if (clause.comparator.key === clause.property.key) {
                mongoClause[clause.property.key] = clause.comparator.expression;
            } else if (dataType == "string") {
                mongoClause[clause.property.key] = {
                    "$regex": clause.value,
                    "$options":"i"
                }

            } else if (dataType == "int") {
                var expression = clause.comparator.expression;
                var key = clause.property.key;
                var value = parseFloat(clause.value);
                if (expression) {
                    mongoClause[key] = {}
                    mongoClause[key][expression] = value;
                } else {
                    mongoClause[key] = value;
                }
            } else if (dataType == "array") {
                var expression = clause.comparator.expression;
                var key = clause.property.key
                var expr = parseFloat(clause.value);

                if (clause.comparator.expression == ">=") {
                    key += "." + (parseFloat(clause.value) - 1);
                    expr = { $exists : true };
                } else if (clause.comparator.expression == "<=") {
                    key += "." + clause.value;
                    expr = { $exists : false };
                } else {
                    expr = { $size : parseFloat(clause.value) }
                }

                mongoClause[key] = expr;
            } else if (dataType == "date") {
                var expression = clause.comparator.expression;
                var key = clause.property.key

                mongoClause[key] = {}
                var date = clause.value;
                if (!angular.isDate(date)) date = parseDate(clause.value);
                mongoClause[key][expression] = date;
            } else {
                mongoClause[clause.property.key] = clause.comparator.expression;
            }


            return mongoClause;
        }

        this.buildSortOrder = function (sortBy){
            if (sortBy.property){
                var order = (sortBy.ascending) ? "" : "-";
                var property = sortBy.property;

                var sort = order + property;
                if (property !== "created") sort += " created";
                return sort;
            }
            return "created";
        }

        this.getDefaultComparators = function() {
            return [{
                name : "equals",
                expression : null,
                dataType : "int"
            },{
                name : "greater than or equal to",
                expression : "$gte",
                dataType : "int"
            }, {
                name : "less than or equal to",
                expression : "$lte",
                dataType : "int"
            }, {
                name : "greater than",
                expression : "$gt",
                dataType : "int"
            }, {
                name : "less than",
                expression : "$lt",
                dataType : "int"
            }, {
                name : "contains",
                expression : "$lt",
                dataType : "string"
            }, {
                name : "is",
                expression : true,
                dataType : "boolean"
            }, {
                name : "is not",
                expression : { "$ne" : true },
                dataType : "boolean"
            }, {
                name : "count is",
                expression : "$size",
                dataType : "array"
            }, {
                name : "count is greater than or equal to",
                expression : ">=",
                dataType : "array"
            }, {
                name : "count is less than or equal to",
                expression : "<=",
                dataType : "array"
            }, {
                name : "after",
                expression : "$gt",
                dataType : "date"
            }, {
                name : "before",
                expression : "$lt",
                dataType : "date"
            }]
        }

        function parseDate(string) {
            var parts = string.split("-");
            var year = parseFloat(parts[0]);
            var month = parseFloat(parts[1]) - 1;
            var day = parseFloat(parts[2]);

            var date = new Date();
            date.setYear(year);
            date.setMonth(month);
            date.setDate(day);

            return date;
        }

    })