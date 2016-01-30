bd.run(['$templateCache', function(templateCache){	
	templateCache.put('bdmenu.html', '<nav class="navbar navbar-default navbar-fixed-top" id="bd-nav-bar-parent"> <div class="container-fluid w90"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bd-nav-bar" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="javascript:void(0)"> <img alt="logo" src="images/brd_logo.png"> </a> </div><div class="collapse navbar-collapse" id="bd-nav-bar"> <ul class="nav navbar-nav navbar-right"> <li ng-class="{\'active\': page==\'home\'}"> <a href="index.html">Home </a> </li><li class="dropdown bd-lg" ng-class="{\'active\': page==\'services\'}"> <a class="dropdown-toggle disabled" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="services.html#/home">Services </a> <ul class="dropdown-menu" ng-hide="hideDropdown"> <li><a href="services.html#/business-intelligence">Business Intelligence</a></li><li><a href="services.html#/data-warehousing">Data warehousing</a></li><li><a href="services.html#/cloud">Cloud</a></li></ul> </li><li class="dropdown bd-sm" ng-class="{\'active\': page==\'services\'}"> <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="#">Services </a><ul class="dropdown-menu"> <li><a href="services.html#/home"> All </a></li><li><a href="services.html#/business-intelligence">Business Intelligence</a></li><li><a href="services.html#/data-warehousing">Data warehousing</a></li><li><a href="services.html#/cloud">Cloud</a></li></ul> </li><li ng-class="{\'active\': page==\'products\'}"> <a href="products.html">Products </a> </li><li ng-class="{\'active\': page==\'aboutus\'}"> <a href="aboutus.html">About Us</a> </li><li ng-class="{\'active\': page==\'contactus\'}"> <a href="contactus.html">Contact Us </a></li></ul> </div></div></nav>')
}])
bd.directive('bdMenu', function ($templateCache) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'bdmenu.html',
		link: function(scope,el,attr){
			scope.page = attr.page;
		}
	};
})