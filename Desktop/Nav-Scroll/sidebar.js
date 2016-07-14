const SIDEBAR = 'sidebar';

angular
  .module(SIDEBAR, [])
  .directive(SIDEBAR, [function() {
    "use strict";

    return {
      restrict: 'E',
      template: `<div class="info-sidebar">
        <div class="info-content" ng-transclude><div>
      </div>`,
      replace: true,
      transclude: true,
      scope: {
        open: '=?'
      },
      link: function(scope, el, attrs) {
        function toggleSidebar() {
          scope.open = !scope.open;
        }

        scope.$on('toggle-info-sidebar', function() {
          toggleSidebar();
        });
      }
    };
  }]);

export default SIDEBAR;
