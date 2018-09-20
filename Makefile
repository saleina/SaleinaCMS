build:
	cd website ; hugo --minify ; npm install ; ../node_modules/.bin/stylus --include ../node_modules/nib/nib ./public/css