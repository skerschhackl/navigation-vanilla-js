# Minimal VanillaJS Navigation

## Description

A simple, minimalist navigation bar build on a local JSON file (see folder `files`), styled based on a video example (see folder `instructions`).
The navigation bar has a sliding underline that indicates the selected item, and resizes itself to match the width of the selected item text. Once a navigation point is selected, the local time will be displayed.

### Setup Instructions

1. Clone the repository: `git clone https://github.com/skerschhackl/navigation-vanilla-js`
2. Navigate to the project directory: `cd navigation-vanilla-js`
3. Since fetching a local file via JavaScript requires a server due to CORS restrictions, you can use a simple HTTP server. You can choose one of the following options:

- Using Node.js and http-server; first install `http-server` globally (if not already installed), then start the server
```
npm install -g http-server

http-server .
```

- Using VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or install directly from VS Code. There will be a link in the bottom of the editor to start and run the server automatically and also view the HTML immediately.

### Notes

- After reviewing the provides colors and the example video, I introduced another grey variable. In my opinion (could be influenced by my screen) the contrast between the lightest and darkest grey would not match the video. To address this and further discuss, I would reach out to the Designer or PM responsible for the ticket to clarify that.

- I added another property `timezone` to the JSON file in order to support my approach of using `Intl.DateTimeFormat` to generate the local time.


### Future Considerations and Improvements

- We could improve the CSS variable naming and maybe introduce granular tokens if we use those in other parts of this page.

- We need to think about error handling. I assumed this is not a critcal part of the page, therefore I went with logging errors in the console.

- We could add some slide in animation to the content block when the city changes.

- We could look into having some unit testing, I suggest something like [this](https://alexwlchan.net/2023/testing-javascript-without-a-framework/)

- We could look into having a horizontal endless scrolling experience on mobile screens. This could also be an option if we need to support more cities in the future.

- We could look into paginated loading if the number of cities increases drastically to improve performance
