/*
 Attaches jquery-ui input mask onto input element
 */
angular.module('ui.directives').directive('uiMask', [
  function () {
    return {
      require:'ngModel',
      link:function ($scope, element, attrs, controller) {

        /* We override the render method to run the jQuery mask plugin
         */
        controller.$render = function () {
          var value = controller.$viewValue || '';
          element.val(value);
          element.mask($scope.$eval(attrs.uiMask));
        };

        /* Add a parser that extracts the masked value into the model but only if the mask is valid
         */
        controller.$parsers.push(function (value) {
          var isValid = element.isMaskValid();
          controller.$setValidity('mask', isValid);
          return isValid ? value : undefined;
        });

        /* When keyup, update the viewvalue
         */
        element.bind('keyup', function () {
          $scope.$apply(function () {
            controller.$setViewValue(element.mask());
          });
        });
      }
    };
  }
]);
