import sidebar from './sidebar';

describe('The sidebar directive', function() {
  var $compile,
      $rootScope,
      $element,
      $anchorScroll,
      $isolateScope,
      $location;

  beforeEach(angular.mock.module(scrollMemo));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$anchorScroll_, _$location_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $anchorScroll = _$anchorScroll_;
    $location = _$location_;
  }));

  // beforeEach(function() {
  //   $element = $compile(
  //     `
  //     <div class="research-body">
  //       <div class="viewport-wrapper" style="height: 300px; overflow-y: auto;">
  //         <div id="test-section" scroll-memo=".viewport-wrapper" style="height: 1000px;">blaalbabla</div>
  //       </div>
  //     </div>
  //     `
  //   )($rootScope);
  //   $rootScope.$digest();
  //   $isolateScope = $element.isolateScope();
  // });

  // it('should find the scrolling parent element', function(done) {
  //   var $parentSelector = $element.find('#test-section').attr('scroll-memo');
  //
  //   expect($parentSelector).toEqual('.viewport-wrapper');
  //   expect($element.find($parentSelector).length).toEqual(1);
  //
  //   done();
  // });
});
