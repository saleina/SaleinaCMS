---
title: Add to Your Site
weight: 20
group: start
---

Saleina CMS is adaptable to a wide variety of projects. It works with any content written in markdown, JSON, YAML, or TOML files, stored in a repo on [GitLab](https://about.gitlab.com/). You can also create your own custom backend.

This tutorial will guide you through the steps for adding Saleina CMS to a site that's built with a common [static site generator](https://www.staticgen.com/), like Jekyll, Hugo, Hexo, or Gatsby.

## App File Structure

All Saleina CMS files are contained in a static `admin` folder, stored at the root of your published site. Where you store this folder in the source files depends on your static site generator. Here's the static file location for a few of the most popular static site generators:

| These generators ...    | store static files in |
| ----------------------- | --------------------- |
| Jekyll, GitBook         | `/` (project root)    |
| Hugo, Gatsby, Nuxt      | `/static`             |
| Hexo, Middleman, Jigsaw | `/source`             |
| Spike                   | `/views`              |
| Wyam                    | `/input`              |

If your generator isn't listed here, you can check its documentation, or as a shortcut, look in your project for a `css` or `images` folder. The contents of folders like that are usually processed as static files, so it's likely you can store your `admin` folder next to those. (When you've found the location, feel free to add it to these docs by [filing a pull request](https://github.com/saleina/saleinacms/blob/master/CONTRIBUTING.md)!)

Inside the `admin` folder, you'll create two files:

```x
admin
 ├ index.html
 └ config.yml
```

The first file, `admin/index.html`, is the entry point for the Saleina CMS admin interface. This means that users can navigate to `yoursite.com/admin/` to access it. On the code side, it's a basic HTML starter page that loads the Saleina CMS JavaScript file. In this example, we pull the file from a public CDN:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>SaleinaCMS</title>
    </head>
    <body>
        <noscript>
            <strong>We're sorry but SaleinaCMS doesn't work without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="SaleinaCMS"></div>
        <script src="https://cdn.jsdelivr.net/npm/saleina-cms@0.1.8/dist/saleina-cms.min.js"></script>
  </body>
</html>
```

The second file, `admin/config.yml`, is the heart of your Saleina CMS installation, and a bit more complex. The [Configuration](#configuration) section covers the details.

## Configuration

Configuration will be different for every site, so we'll break it down into parts.  All code snippets in this section will be added to your `admin/config.yml` file.

### Backend

We're using [Gitlab](https://www.gitlab.com) for our hosting and authentication in this tutorial, so backend configuration is fairly straightforward. 

For GitLab repositories, you can start your Saleina CMS `config.yml` file with these lines:

```yaml
backend:
  name: gitlab
  branch: master # Branch to update (optional; defaults to master)
```

The configuration above specifies your backend protocol and your publication branch. If you leave out the `branch` declaration, it will default to `master`.

### Media and Public Folders

Saleina CMS allows users to upload images directly within the editor. For this to work, the CMS needs to know where to save them. If you already have an `images` folder in your project, you could use its path, possibly creating an `uploads` sub-folder, for example:

```yaml
# This line should *not* be indented
media_folder: "images/uploads" # Media files will be stored in the repo under images/uploads
```

If you're creating a new folder for uploaded media, you'll need to know where your static site generator expects static files. You can refer to the paths outlined above in [App File Structure](#app-file-structure), and put your media folder in the same location where you put the `admin` folder.

Note that the`media_folder` file path is relative to the project root, so the example above would work for Jekyll, GitBook, or any other generator that stores static files at the project root. However, it would not work for Hugo, Hexo, Middleman or others that store static files in a subfolder. Here's an example that could work for a Hugo site:

```yaml
# These lines should *not* be indented
media_folder: "static/images/uploads" # Media files will be stored in the repo under static/images/uploads
public_folder: "/images/uploads" # The src attribute for uploaded media will begin with /images/uploads
```

The configuration above adds a new setting, `public_folder`. While `media_folder` specifies where uploaded files will be saved in the repo, `public_folder` indicates where they can be found in the published site. This path is used in image `src` attributes and is relative to the file where it's called. For this reason, we usually start the path at the site root, using the opening `/`.

*If `public_folder` is not set, Saleina CMS will default to the same value as `media_folder`, adding an opening `/` if one is not included.*


### Collections

Collections define the structure for the different content types on your static site. Since every site is different, the `collections` settings will be very different from one site to the next.

Let's say your site has a blog, with the posts stored in `_posts/blog`, and files saved in a date-title format, like `1999-12-31-lets-party.md`. Each post begins with settings in yaml-formatted front matter, like so:

```yaml
---
layout: blog
title: "Let's Party"
date: 1999-12-31 11:59:59 -0800
thumbnail: "/images/prince.jpg"
rating: 5
---

This is the post body, where I write about our last chance to party before the Y2K bug destroys us all.
```

Given this example, our `collections` settings would look like this:

```yaml
collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "content/blog" # The path to the folder where the documents are stored
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    tabs:
      - label: Basic
        fields: # The fields for each document, usually in front matter
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Publish Date", name: "date", widget: "datetime"}
          - {label: "Featured Image", name: "thumbnail", widget: "image"}
          - {label: "Rating (scale of 1-5)", name: "rating", widget: "number"}

      - label: Body
        fields: 
          - {label: "Body", name: "body", widget: "markdown"}
```

Let's break that down:

<table>
  <tr>
    <td><code>name</code></td>
    <td>Post type identifier, used in routes. Must be unique.</td>
  </tr>
  <tr>
    <td><code>label</code></td>
    <td>What the post type will be called in the admin UI.</td>
  </tr>
  <tr>
    <td><code>folder</code></td>
    <td>Where files of this type are stored, relative to the repo root.</td>
  </tr>
  <tr>
    <td><code>slug</code></td>
    <td>Template for filenames. <code>{{year}}</code>, <code>{{month}}</code>, and <code>{{day}}</code> will pull from the post's <code>date</code> field or save date. <code>{{slug}}</code> is a url-safe version of the post's <code>title</code>. Default is simply <code>{{slug}}</code>.</td>
  </tr>
  <tr>
    <td><code>tabs</code></td>
    <td>tabs listed here are shown as tabs in the cotent editor. Each tab contains the following properties:
      <ul>
        <li><code>label</code>: Tab label in the editor UI.</li>
        <li><code>fields</code>: Fields listed here are shown as fields in the content editor, then saved as front matter at the beginning of the document (except for <code>body</code>, which follows the front matter). Each field contains the following properties:
          <ul>
            <li><code>label</code>: Field label in the editor UI.</li>
            <li><code>name</code>: Field name in the document front matter.</li>
            <li><code>widget</code>: Determines UI style and value data type (details below).</li>
            <li><code>default</code> (optional): Sets a default value for the field.</li>
          </ul>
        </li>
      </ul>
    </td>
  </tr>
</table>

As described above, the `widget` property specifies a built-in or custom UI widget for a given field. When a content editor enters a value into a widget, that value will be saved in the document front matter as the value for the `name` specified for that field. A full listing of available widgets can be found in the [Widgets doc](/docs/widgets).

Based on this example, you can go through the post types in your site and add the appropriate settings to your Saleina CMS `config.yml` file. Each post type should be listed as a separate node under the `collections` field.

## Accessing the CMS

Your site CMS is now fully configured and ready for login!

You can access your site's CMS at `yoursite.com/admin/`.

That's All Folks!
