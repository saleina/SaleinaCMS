---
title: Datetime
group: widgets
---

The datetime widget translates a datetime picker to a datetime string. For saving the date only, use the date widget.

- **Name:** `datetime`
- **UI:** datetime picker
- **Data type:** Flatpickr formatted datetime string
- **Options:**
  - `default`: accepts a datetime string, or an empty string to accept blank input; otherwise defaults to current datetime
  - `format`: optional; accepts Flatpickr.js [tokens](https://flatpickr.js.org/formatting/); defaults to raw Date object (if supported by output format)
- **Example:**

  ```yaml
  - label: "Start time"
    name: "start"
    widget: "datetime"
    format: "Y-m-d h:i K"
  ```
