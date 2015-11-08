var express = require('express');
var router = express.Router();
var brodin_data = require('../raw_book/brodin_data.json');

router.get('/', function(req, res){
	res.json({ message: 'Hooray! Welcome to our Book of Brodin api!' });   
});

router.get('/passage', function(req, res){
	var maxLength = req.query.maxLength;

	var results = brodin_data.quotes;
	if(maxLength){
		results = results.filter(function(passage){ 
			return passage.quote.length < maxLength;
		});   	
	} 
	res.json(results.random());   
});

router.get('/passage/search/:text', function(req, res){
	var searchText = req.params.text;
	var maxLength = req.query.maxLength;
	var book = req.query.book;

	var results = brodin_data.quotes.filter(function(passage){ 
		return (new RegExp(searchText, 'i')).test(passage.quote); 
	});

	if(book){
		results = results.filter(function(passage){ 
			return (new RegExp(book, 'i')).test(passage.book);
		});
	}
	if(maxLength){
		results = results.filter(function(passage){ 
			return passage.quote.length < maxLength;
		});   	
	} 
	allowMultiple(req, res, results); 
});


router.get('/deity', function(req, res){
	res.json(brodin_data.deities.random());
});

router.get('/deity/search/:name', function(req, res){
	var name = req.params.name;
	var results = brodin_data.deities.filter(function(deity){ 
		return (new RegExp(name, 'i')).test(deity.name);
	});
	allowMultiple(req, res, results);   
});

router.get('/book', function(req, res){
	var results = brodin_data.quotes.map(function(result){ 
		return { 
			'title' : result.book 
		}; 
	});
	res.json(results.random());  
});

router.get('/book/search/:title', function(req, res){
	var title = req.params.title;
	var results = brodin_data.quotes.filter(function(passage){ 
		return (new RegExp(title, 'i')).test(passage.book);
	})
	.map(function(result){ 
		return { 
			'title' : result.book 
		}; 
	});
	allowMultiple(req, res, results);   
});


router.get('/brodin_data.json', function(req, res){
	res.json(brodin_data);
});

function allowMultiple(req, res, results){
	var multipleResults = req.query.multipleResults;

	if(!multipleResults){
		results = results.random();
	}
	res.json(results);
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}


module.exports = router;