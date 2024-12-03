JS = $(wildcard *.js)
HTML = $(wildcard *.html)
PNG = $(wildcard *.png)
JSON = $(wildcard *.json)

all: extension.zip

extension.zip: $(JS) $(HTML) $(PNG) $(JSON)
	zip -r extension.zip $(JS) $(HTML) $(PNG) $(JSON)

clean:
	rm -f extension.zip
