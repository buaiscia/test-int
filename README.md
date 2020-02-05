# Cropster Frontend Task


## Instructions on how to use it

- Run a local server through nodeJS or equal. On nodeJS you can use the command 'http-server -c-1' or similar and open localhost on http://127.0.0.1:8080/
- Scan the codes which will be stored in LocalStorage and retrieved in the application as a list. You can add and delete every code without limitation.

### Notes

- It's possible to create a fully functional nodeJS app, but I implemented it this way in order to use only pure JS files, and avoid the Express framework too. The server initialization is in order to import/export modules. Please let me know if you have any questions.

## Description

This example is based on a real business case. It's about creating a QR-Code scanner being capable of importing coffee data into your application, persist it on the client's device and present it in a list view with possibility to delete it again.

## Task 1: Download required dependencies

For reading QR codes please install `jsQR` (port of ZXing QR code library):

- https://github.com/cozmo/jsQR

Note: Please **do not** use any other dependencies to complete the task.

## Task 2: Implement the coffee importer

It should basically work the same as f.e. https://webqr.com (no data upload required, just scanning via camera), so that users can scan QR codes with the camera of their device. You will find the required sample QR codes for testing in `data` folder. The QR codes contain stringified JSON from the following format:

```json
{
    "name": "<string>",
    "process": "<string>",
    "certificates": "Array<string>",
    "weight": {
        "amount": "<number>",
        "unit": "<string>"
    }
}
```

The fields `process` and `unit` are enums for which you will find predefined data in `utils/enums.js`. The field `certificates` is a collection of predefined certificates for coffees, you will find the whole collection in `utils/fixtures.js`. Please store scanned data on the user's device and keep in mind that the data source may change in the future.

## Task 3: Implement a simple list view

Please list scanned coffees from data source in a simple list view. Also, allow the user to delete a scanned coffee. As this list may be used in different places, implement it as a reusable element (= web component).

## General notes

- No special CSS required
- No responsiveness required
- No frameworks allowed, use only ES6
- Questions: Get in touch at armin@cropster.com