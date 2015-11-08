(function(){

	var BASE_ENDPOINT = 'http://localhost:3000';

	var RANDOM_PASSAGE_URL  = '/api/passage',
		RANDOM_DEITY_URL    = '/api/deity',
		RANDOM_BOOK_URL     = '/api/book',
		SEARCH_PASSAGE_URL  = '/api/passage/search/',
		SEARCH_DEITY_URL    = '/api/deity/search/',
		SEARCH_BOOK_URL     = '/api/book/search/',
		RAW_BOOK_URL        = '/api/brodin_data.json';

	var idToURL = {
		'randomQuote' : BASE_ENDPOINT + RANDOM_PASSAGE_URL,
		'randomDeity' : BASE_ENDPOINT + RANDOM_DEITY_URL,
		'randomBook'  : BASE_ENDPOINT + RANDOM_BOOK_URL,
		'searchQuote' : BASE_ENDPOINT + SEARCH_PASSAGE_URL,
		'searchDeity' : BASE_ENDPOINT + SEARCH_DEITY_URL,
		'searchBook'  : BASE_ENDPOINT + SEARCH_BOOK_URL,
		'rawData'  	  : BASE_ENDPOINT + RAW_BOOK_URL
	};

	var pageContent = {
		$searchTextField 		: $('#searchText'),
		$bookSearchField 		: $('#bookSearch'),
		$maxLengthField  		: $('#maxLength'),
		$allowMultiplesField	: $('#allowMultiples'),
		$results 				: $('#results')
	}

	$('button').click(function(e){
		var bookSearchText,
			maxLengthValue,
			allowMultipleValue,
			id = this.id,
			$this = $(this),
			searchText = '',
			queryStringParams = [],
			bookSearchText = '';

		//Extra values and query string values for search api's
		if($this.hasClass('searchApi')){
			searchText = pageContent.$searchTextField.val();
			bookSearchText = pageContent.$bookSearchField.val();
			if(!searchText || searchText === ''){
				//Notify to give search
				alert('Bro, give me some search text');
				return;
			}
			if(pageContent.$allowMultiplesField.prop('checked')){
				queryStringParams.push({'key' : 'multipleResults', 'value' : 'true'});
			}

			if(id === 'searchQuote' && bookSearchText && bookSearchText !== ''){
				queryStringParams.push({'key' : 'book', 'value' : bookSearchText});
			}
		}

		//max length query string param if its a quote
		if(id === 'randomQuote' || id == 'searchQuote'){
			maxLengthValue = pageContent.$maxLengthField.val();
			if(maxLengthValue && maxLengthValue !== 0){
				queryStringParams.push({'key' : 'maxLength', 'value' : maxLengthValue});
			}
		}

		displayApiResults(idToURL[id] + searchText + createQueryString(queryStringParams));
		console.log('Error in switch statement');
	});

	function createQueryString(queryStringParams){
		if(!queryStringParams || queryStringParams.length === 0){
			return ''
		}
		return '?' + queryStringParams.map(function(paramObj){
						return paramObj.key + '=' + paramObj.value;
					})
					.join('&');
	}

	function displayApiResults(apiEndpoint){
		$.getJSON(apiEndpoint, function( data ) {
			if(data){
				pageContent.$results.text(JSON.stringify(data, null, 2));
			} else {
				pageContent.$results.text('No results found using api endpoint: ' + apiEndpoint);
			}
		});
	}

}());