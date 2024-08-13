# Minimal VanillaJS Navigation

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Description

A simple, minimalist navigation bar build on a local JSON file (see folder `files`), styled based on a video example (see folder `instructions`).
The navigation bar has a sliding underline that indicates the selected item, and resizes itself to match the width of the selected item text.

### Setup Instructions

1. Clone the repository: `git clone https://github.com/username/project-name.git`
2. Navigate to the project directory: `cd project-name`
3. Since fetching a local file via JavaScript requires a server due to CORS restrictions, you can use a simple HTTP server. You can choose one of the following options:

- Using Node.js and http-server
Install http-server globally (if not already installed)
```
npm install -g http-server
```

Start the server:
```
http-server .
```

- Using VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or install directly from VS Code. There will be a link in the bottom of the editor to start and run the server automatically and also view the HTML immediately.

### Notes

- After reviewing the provides colors and the example video, I introduced another grey variable. In my opinion (could be influenced from my macbook) the contrast between the lightest and darkest grey would not match the video. I would reach out to the Designer or PM responsible for the ticket to clarify that.

- I added another property `timezone` to the JSON file in order to support my approach of using `Intl.DateTimeFormat` to generate the local time.


### Considerations and Improvements if given more time

- We could improve the CSS variable naming and maybe introduce granular tokens if we use those in other parts of this page.

- We need to think about error handling. I assumed this is not a critcal part of the page, therefore I went with logging errors in the console.

- We could add some slide in animation to the content block when the city changes.

- We could look into having some unit testing, I suggest something like [this](https://alexwlchan.net/2023/testing-javascript-without-a-framework/)
