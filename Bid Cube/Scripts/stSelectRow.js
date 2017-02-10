ng.module('smart-table')
  .directive('stSelectRow', ['stConfig', function (stConfig) {
    return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        row: '=stSelectRow'
      },
      link: function (scope, element, attr, ctrl) {
        var mode = attr.stSelectMode || stConfig.select.mode;
        element.bind('click', function () {
          scope.$apply(function () {
            ctrl.select(scope.row, mode);
          });
        });

        scope.$watch('row.isSelected', function (newValue) {
          if (newValue === true) {
              element.addClass(stConfig.select.selectedClass);
              document.getElementById("addEditModalButton").innerHTML = "Edit"
          } else {
              element.removeClass(stConfig.select.selectedClass);
              document.getElementById("addEditModalButton").innerHTML = "Add"
          }
        });
      }
    };
  }]);
