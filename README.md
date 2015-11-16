# Book Of Brodin
Quotes from the book of brodin

http://bookofbrodin.wikia.com/wiki/Book_of_Brodin_Wiki

Docker Repo

https://hub.docker.com/r/alexbezek/bookofbrodin/

### Available API's
There are the available api's that are currently implemented. Searching is case insensitive. Below are all api's and further down are more details around each one. 
```
GET /api/passage
GET /api/passage/search/:text/
GET /api/deity
GET /api/deity/search/:name
GET /api/book
GET /api/book/search/:title
GET /api/brodin_data.json
```

##### Random passage
```
GET /api/passage
```
###### Query string parameters
* maxLength (int) restricts results to quotes with this many characters or less. Doesn't truncate, restricts the search

##### Random Book
```
GET /api/book
```
##### Random Deity
```
GET /api/deity
```


##### Search for a passage
```
GET /api/passage/search/:text/
```
###### Query string parameters
* maxLength (int) restricts results to quotes with this many characters or less. Doesn't truncate, restricts the search
* book (string) search text for searching for a text in a book. 
* multipleResults (bool) True returns all results. Defaults to false

##### Search for a Deity
```
GET /api/deity/search/:name
```
###### Query string parameters
* multipleResults (bool) True returns all results. Defaults to false

##### Search for a Deity
```
GET /api/book/search/:title
```
###### Query string parameters
* multipleResults (bool) True returns all results. Defaults to false


##### Raw Book Data
```
GET /api/brodin_data.json
```
