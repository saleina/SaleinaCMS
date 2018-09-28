---
title: File
group: widgets
---

The file widget allows editors to upload a file or select an existing one from the media library. The path to the file will be saved to the field as a string.

- **Name:** `file`
- **UI:** file picker button opens media gallery allowing to pick files; displays selected file name
- **Data type:** file path string, based on `media_folder`/`public_folder` configuration
- **Options:**
  - `default`: accepts a file path string; defaults to null
- **Example:**

  ```yaml
  - label: "Document"
    name: "document"
    widget: "file"
    default: "/uploads/doc.pdf"
  ```
