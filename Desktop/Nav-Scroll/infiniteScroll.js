import _ from 'underscore';

const INFINITE_SCROLL = 'infiniteScroll';
const SCROLL_DETECT = 'scrollDetect';

angular.module(INFINITE_SCROLL, [])
  .directive(INFINITE_SCROLL, ['$window', '$location', '$timeout', '$interval', ($window, $location, $timeout, $interval) => {
    'use strict';

    return {
      restrict: 'A',
      link: {
        pre: function(scope, el) {
          if(scope && scope.infiniteScrollDisabled !== 'true') {
            let itemsPerRow = (scope.docsPerRow) ? scope.docsPerRow : 1;
            scope.initialDocAmount = (scope.basicRowHeight) ? Math.ceil(el.height() / scope.basicRowHeight) * itemsPerRow : 48;
          }

          scope.scrollIntoView = (rowId) => {
            // $timeout(() => {
            //   el.scrollTop($(rowId).offset().top);
            // }, 250);
            let row = null,
                offset = 50;

            let elementCheck = $interval(() => {
              // console.log("CHECKING FOR ELEMENT", Date.parse(new Date()));
              row = $(rowId);
              if(row.length) {
                $interval.cancel(elementCheck);
                el.scrollTop(row.offset().top - offset);
              }
            }, 50);
          };
        },
        post: function(scope, el, attrs) {
          let viewportHeight = el.height();

          /**
           * @method updateLocation
           * updates the search string in the url with the current docIndex
           * @arg value {String}
           * @return undefined
           */
          function updateLocation(value) {
            $location.search('doc', value).replace();
          }

          if(scope && scope.scrollLoadMore && scope.infiniteScrollDisabled !== 'true') {
            let loadDistance = (scope && scope.infiniteScrollDistance) ? $window.parseInt(scope.infiniteScrollDistance) : 200;

            /**
             * @method triggerDocLoad
             * triggers the current page controller to load more docs
             * @arg cb {Function}
             * @return undefined
             */
            function triggerDocLoad(cb) {
              scope.scrollLoadMore().call(this, (err, results) => {
                if(err) {
                  console.error(err);
                } else {
                  let timestamp = new Date();
                  console.info(`[${timestamp}]: finished loading more docs, total: ${results.length}`);

                  if(cb) {
                    cb.call(this, results.length);
                  }
                }
              });
            }

            /**
             * @method updateDocIndex
             * updates the docIndex property on the controller scope
             * & appends the value in the url
             * @return true {Boolean}
             */
            function updateDocIndex() {
              // Array.from() does not work in IE...
              // using jQuery.makeArray() instead
              $.makeArray($(scope.scrollDocumentList)).some((el, idx) => {
                if(el.getBoundingClientRect().top >= 50) {

                  if(scope.scrollDocIndex !== el.id) {
                    scope.$apply(() => {
                      scope.scrollDocIndex = el.id;
                      updateLocation(scope.scrollDocIndex);
                    });
                  }

                  return true;
                }
              });
            }

            /**
             * @method listen
             * listen to scroll events in the page and triggers doc reloading if needed
             * @return undefined
             */
            function listen(e) {
              // load older docs if you reach the bottom
              if((e.currentTarget.scrollTop + el.height()) >= (e.target.scrollHeight - loadDistance)) {
                triggerDocLoad();
              }

              // load more recent docs if you reach the top
              if(scope.scrollDirection === 'up' && e.target.scrollTop <= loadDistance) {
                // console.log('getting recent docs', e.target.scrollTop);
                triggerDocLoad();
              }

              // get the document that is on top of the viewport
              updateDocIndex();
            }

            /**
             * @method injectMore
             * injects more documents in the page (if needed) when the window is resized
             * @return true | undefined
             */
            function injectMore() {
              // grab the element that holds the docs
              let content = el.find('.viewport-inner-wrapper ng-transclude').children().first();
              // if we got more room, we should load more docs
              if(el.height() > viewportHeight && el.height() > content.height()) {
                triggerDocLoad(() => {
                  // store new viewport height
                  viewportHeight = el.height();
                  // recursively check if more docs need to be loaded
                  $timeout(injectMore, 250);
                });
              } else {
                return true;
              }
            }

            // listeners
            el.bind('scroll', _.throttle(listen, 250));
            $($window).bind('resize', _.debounce(injectMore, 500));
          }
        }
      }
    };
  }])
  .directive(SCROLL_DETECT, [function() {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        let scrollTopPosition;

        /**
         * @method updateScrollTopPosition
         * stores the current scrollTop value
         * @arg pos {Integer}
         * @return undefined
         */
        function updateScrollTopPosition(pos) {
          scrollTopPosition = (pos !== undefined) ? pos : el.scrollTop();
        }

        updateScrollTopPosition();

        /**
         * @method updateScrollDirection
         * updates the scrollDirection property on the current controller
         * when a scroll direction change is detected
         * @arg e {Object}
         * @return undefined
         */
        function updateScrollDirection(e) {
          scope.$apply(() => {
            scope.scrollDirection = (e.currentTarget.scrollTop > scrollTopPosition) ? 'down': 'up';
          });

          updateScrollTopPosition(e.currentTarget.scrollTop);
        }

        el.bind('scroll', _.throttle(updateScrollDirection, 250));

        // scope.$watch('scrollDirection', function(n, o) {
        //   console.log(`scroll dire is now: ${n}, was: ${o}`);
        // });
        //
        // scope.$watch(function() {
        //   return scrollTopPosition;
        // }, function(n, o) {
        //   console.log(`scroll pos is now: ${n}, was: ${o}`);
        // })
      }
    };
  }]);

export default INFINITE_SCROLL;
