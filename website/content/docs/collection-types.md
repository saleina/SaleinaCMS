---
title: Collection Types
weight: 27
group: start
---

All editable content types are defined in the `collections` field of your `config.yml` file, and displayed in the left sidebar of the editor UI.

Collections come in two main types: `folder` and `files`.

## Folder collections

Folder collections represent one or more files with the same format, fields, and configuration options, all stored within the same folder in the repository. You might use a folder collection for blog posts, product pages, author data files, etc.

Unlike file collections, folder collections have the option to allow editors to create new items in the collection. This is set by the boolean `create` field.

**Note:** Folder collections must have at least one field with the name "title" for creating new entry slugs. That field should use the default "string" widget. The "label" for the field can be any string value.

Example:

```yaml
- label: "Blog"
  name: "blog"
  folder: "content/blog"
  tabs:
    - label: Basic
      fields:
        - {label: "Title", name: "title", widget: "string"}
        - {label: "Publish Date", name: "date", widget: "datetime"}
        - {label: "Featured Image", name: "thumbnail", widget: "image"}
    - label: Body
      fields:
        - {label: "Body", name: "body", widget: "markdown"}
```

## File collections

A `files` collection contains one or more uniquely configured files. Unlike items in `folder` collections, which repeat the same configuration over all files in the folder, each item in a `files` collection has an explicitly set path, filename, and configuration. This can be useful for unique files with a custom set of fields, like a settings file or a custom landing page with a unique content structure.

When configuring a `files` collection, each file in the collection is configured separately, and listed under the `files` field of the collection. Each file has its own list of `tabs` and `fields`, and a unique filepath specified in the `file` field (relative to the base of the repo).

**Note:** Files listed in a file collection must already exist in the repo, and must have a valid value for the file type. For example, an empty file works as valid YAML, but a JSON file must have a non-empty value to be valid, such as an empty object.

Example:

```yaml
- label: "Pages"
  name: "pages"
  files:
    - label: "Home"
      name: "home"
      file: "content/_index.md"
      tabs:
        - label: "Basic"
          fields:
            - {label: "Title", name: "title", widget: "string"}
            - {label: "Intro", name: "intro", widget: "markdown"}

        - label: "Team"
          fields:
            - label: "Team"
              name: "team"
              widget: "list"
              fields:
                - {label: "Name", name: "name", widget: "string"}
                - {label: "Position", name: "position", widget: "string"}
                - {label: "Photo", name: "photo", widget: "image"}
```
