const makeBritish = word => {

	/*easiest*/
	word = word
		.replace(/ou/g,'_NOPE_')
		.replace(/o/g,'ou')
		.replace(/_NOPE_/g,'ou');

	/*shop -> shoppe */
	word = word
		.replace(/([p])$/g,'$1$1e');

	/* grey gray? - */
	word = word
		.replace(/re/g,'ra');

	/*shift -er to -re */
	word = word
		.replace(/e(.)$/g,'$1e');

	/* -ze -ce */
	word = word
		.replace(/[cz](e)$/g,'s$1');

	/* double ll */
	word = word
		.replace(/([aeiou])l/g,'$1ll')
		.replace(/lll/g,'ll');

	return word;

};

module.exports = makeBritish;
