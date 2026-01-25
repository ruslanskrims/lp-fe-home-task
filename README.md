## Levelpath frontend take-home task

### Task

Implement a list of today's birthdays using Wikipedia "On this day" API: https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day.

### Requirements

- Initially there must be a button. Data is fetched and displayed after the button is clicked.
- Entries must be sorted by year (newest first by default) with a toggle option for ascending/descending order.
- "Loading" message/UI component must be shown while data is being fetched.
- Error modal must be shown when fetching data has failed.
- Implement frontend pagination to handle a large number of entries.
- Write some custom CSS for basic styling (should not use utility class CSS frameworks, such as Tailwind).

### Implementation requirements

- React framework and global state management solution of your choice (Context, Redux, MobX, etc.) must be used.
- The project structure should be designed with future extendability in mind, as it will serve as a base for live coding exercises.
- Provide some basic styling with custom css or css-in-js solution of your choice.
- You can use whatever React project boilerplate, tools and libraries you like.
- TypeScript is preferred over JavaScript.
- Application parts must have tests, however it's not necessary to have full test coverage, write at least a single one for every type of test. As an example for imaginary Redux project: action creator, reducer, asynchronous functions, UI component render, UI component user interactions are different types of tests.

### Submitting

- Please bundle your homework using `git bundle create lp-fe-homework.bundle --all`
- Attach bundle file to email and send as a reply to initial homework email
- We will then extract it using `git clone lp-fe-homework.bundle` on our side


---
version: 2025-05-19
