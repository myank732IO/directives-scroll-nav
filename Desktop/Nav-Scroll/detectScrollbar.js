let directive = [
  '$document',
  ($document) => {
    "use strict";

    return {
      restrict: 'A',
      link: (scope, el) => {
        /**
         * offsetWidth = element width including scrollbar
         * clientWidth = element width without scrollbar
         * If offsetWidth > clientWidth, then we have a scrollbar
         * and we can calculate its width
         */
        if(el[0].offsetWidth > el[0].clientWidth) {
          let body = $document.find('body'),
              scrollbarWidth = el[0].offsetWidth - el[0].clientWidth;

          body.addClass(`has-scrollbar scrollbar-${scrollbarWidth}`);
        }
      }
    };
  }
];

export default directive;
