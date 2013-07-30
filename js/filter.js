angular.module('viffFilter',[]).filter('encodeurl', function(){
	return function(input){
		return encodeURIComponent(input);
	}

})