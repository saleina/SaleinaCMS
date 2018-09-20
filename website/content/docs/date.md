---
title: Date
group: widgets
---

The date widget translates a date picker input to a date string. For saving date and time together, use the datetime widget.

- **Name:** `date`
- **UI:** date picker
- **Data type:** Flatpickr formatted date string
- **Options:**
  - `default`: accepts a date string, or an empty string to accept blank input; otherwise defaults to current date
  - `format`: optional; accepts Flatpickr.js [tokens](https://flatpickr.js.org/formatting/); defaults to raw Date object (if supported by output format)
- **Example:**

  ```yaml
  - label: "Birthdate"
    name: "birthdate"
    widget: "date"
    default: ""
    format: "Y/m/d"
  ```
