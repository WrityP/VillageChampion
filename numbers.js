function randomItem(array){
	return array[Math.floor(Math.random()*array.length)];
}

var roll = function(mini,maxi){
	return (Math.ceil(Math.random()*(1+maxi-mini))+(mini-1));
}