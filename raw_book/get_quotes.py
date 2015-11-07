import json
import requests

resp = requests.get('http://bookofbrodin.wikia.com/api/v1/Articles/List',
                    params={'limit': 100})

articles = resp.json()['items']

for article in articles:
    id_ = article['id']
    title = article['title']

    print "Fetching Article {}".format(id_)

    article['sections'] = requests.get(
        'http://bookofbrodin.wikia.com/api/v1/Articles/AsSimpleJson',
        params={'id': id_}
    ).json()['sections']


with open('brodin.json', 'w') as f:
    f.write(json.dumps(articles, indent=4))

print "Book written to brodin.json"