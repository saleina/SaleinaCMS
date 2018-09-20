# Saleina CMS Website & Docs

This directory builds saleinacms.org. If you'd like to propose changes to the site or docs, you'll find the source files in here.

## Local development

The site is built with [Hugo](https://gohugo.io/). 

To run the site locally, you'll need to have [Node](https://nodejs.org) and [Hugo](https://gohugo.io/) installed on your computer.

From your terminal window, `cd` into the `website` directory of the repo, and run

```bash
../node_modules/.bin/stylus --include ../node_modules/nib/lib/ --watch static/css/
hugo server
```

Then visit http://localhost:1313/ - Hugo will automatically reload CSS or
refresh the page when stylesheets or content changes.
