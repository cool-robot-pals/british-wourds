require('dotenv').config();
const redis = require('redis');
const fs = require('fs');
const makeBritish = require('./../lib/makeBritish.js');

const words = fs.readFileSync('./bin/words.txt').toString().split('\n');
const britishWords = words.map(makeBritish);

const client = redis.createClient(process.env.REDIS_URL);

client.on('error', function (err) {
	console.log('Error ' + err);
});

client.get('last', function(err, reply) {
	if(err) {
		console.error(err);
		client.set('last', 0, redis.print);
	}
	console.log(`starting at ${reply}/${words.length}`);
	let posted = false;
	for(let i = reply; i < words.length; i++) {
		if(britishWords[i]!==words[i]) {
			const tweet = [`🇺🇸  ${words[i]}`,`🇬🇧  ${britishWords[i]}`].join('\n');
			console.log(tweet);
			posted = true;
			client.set('last', parseInt(i)+1);
			break;
		}
	}
	if(!posted) {
		console.error(`ran out of words`)
		client.set('last', 0, redis.print);
	}
});
