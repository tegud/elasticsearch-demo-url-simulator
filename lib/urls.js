var utilities = require('./utilities');

var searchTerms = [
	'telephones',
	'tv',
	'hdtv',
	'laptop',
	'harddrive',
	'computer',
	'lego',
	'cheese',
	'wine',
	'star wars t-shirts'
];

var urlStructures = [
	function() {
		return '/';
	},
	function() {
		return '/search?term=' + searchTerms[utilities.randomNumber(0, searchTerms.length - 1)];
	}, 
	function() {
		return '/productDetails/' + utilities.randomNumber(0, 10000)
	}
];

module.exports = {
	random: function randomUrl() {
		return urlStructures[utilities.randomNumber(0, urlStructures.length - 1)]();
	}
};