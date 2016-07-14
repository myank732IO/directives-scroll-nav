import infiniteScroll from './infiniteScroll';

describe('Research sidebar directive', function() {
  var $compile;
  var $rootScope;
  var $element;

  beforeEach(angular.mock.module(infiniteScroll));
  
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function() {
    $element = $compile(
      `<ul infinite-scroll="loadMore()">
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>`
    )($rootScope);
    $rootScope.$digest();
  });

  // it('should call loadMore if you scroll beyond the content', function(done) {
  //   $rootScope.loadMore = function() {
  //     done();
  //   }
  //
  //   $element.height(30)
  //   $element[0].scrollHeight = 50;
  //   $element.trigger('scroll');
  //   spyOn($rootScope, 'loadMore')
  //   expect($rootScope.loadMore).toHaveBeenCalled();
  // });
  //
  // it('should not call load more if you can view all the content', function(done) {
  //   $rootScope.loadMore = function() {
  //     done();
  //   }
  //   $element.height(300)
  //   $element[0].scrollHeight = 10;
  //   $element.trigger('scroll');
  //   spyOn($rootScope, 'loadMore')
  //   expect($rootScope.loadMore).not.toHaveBeenCalled();
  // });

});
