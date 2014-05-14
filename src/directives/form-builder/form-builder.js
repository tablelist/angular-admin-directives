angular.module('directives.form-builder', ['textAngular'])
    .directive('formBuilder', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/directives/form-builder/form-builder.tpl.html',
            controller: "FormBuilderDirectiveCtrl",
            scope: {
              config: '='
            },
        };
    })

    /* =========================================================================
     *  Controller
     * ========================================================================= */
    // FORM BUILDER :
    // Form Builder is an Angular Directive for generating HTML forms.

    // ABOUT :
    // HTML forms are stylized using Bootstrap's form-horizontal class.
    // Form Builder takes in an object with the following keys:
    //    - Object: A reference to the object being edited
    //    - OnSave:   Callback when the form is submitted
    //    - OnCancel: Callback when the form is canceled
    //    - params: An array containing objects defining each field

    // PARAMS :
    // Form Builder supports a variety of parameters. Params are defined by:
    //    - Name : Title of the form field
    //    - key (string) : The key for finding the data on the object
    //    - getValue (function) : The function for finding the data on the object
    //    - type : The data type of how Form Builder should manange that field.
    //    - onClick : When user clicks the form field. Passes the object to the function
    //    - help : Optional. Adds an inline element that provides help when clicked
    //    - editable: can the user change the data? True if unspecified

    // TYPES :
    // Data types include:
    //    - date        : non-editable UTC date stamp.
    //    - integer     : text field
    //    - currency    : text field with dollar icon
    //    - boolean     : Checkbox
    //    - select      : Pulldown
    //    - radio       : radio buttons
    //    - text-area   : Multi-line text area
    //    - html        : Text Angular HTML writer
    //    - default     : text field

    .controller('FormBuilderDirectiveCtrl', ['$scope', function($scope) {

            // Supported HTML tags in text-angular
            $scope.htmltags = [
                ['h1','h2','h3','p'],
                ['bold', 'italics', 'underline'],
                ['ul', 'ol'],
                ['html']
            ]

            // Fetch the data from the object.
            // getValue() takes in the instructions for a form field.
            // param will contain either a key or a getValue funtion
            // for fetching the appropriate data from the object
            $scope.getValue = function(param){
                var object = $scope.config.object;

                // If we have a key for our current object
                // Supports nested objects:
                // For example: user.address.street
                if (param.key) {
                    var keysParts = param.key.split('.');

                    angular.forEach(keysParts, function (keyPart) {
                        // Ensure that object.key exists
                        if (object[keyPart]) {
                            object = object[keyPart]

                        // Otherwise return non-existant object
                        } else {
                            object = "";
                        }
                    });

                    return object;

                // Execute provided getValue() function to fetch field's value
                } else if (param.getValue){
                    return param.getValue(object)
                }
            }

            // Actions when user clicks the data
            $scope.click = function(param){
                if (param.onClick) param.onClick($scope.config.object);
            }

            // Open help dialog to display additional information to user
            $scope.help = function(msg){
                // Alert.help(msg)
                alert(msg)
            }

            // Execute designated save function
            $scope.save = function(){
                $scope.config.onSave($scope.config.object);
            }

            // Execute designated cancel function
            $scope.cancel = function(){
                $scope.config.onCancel();
            }
    }])

    // We'll need a filter for fixing UTC dates
    .filter('utc', function() {
        return function(date) {
            if (date) {
                if(angular.isNumber(date) || typeof date == 'string') {
                    date = new Date(date);
                }
                return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            }
        }
    })
