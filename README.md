This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Autocomplete Github-User-Search

Install the project by typing 

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Questions

### What do you like about your solution?

I like that the user can select the preferred User Profile either using Arrow-Keys<br>
but also using the Mouse.

I like the possibility to reuse the Component with different data-aggregation and design.

### What do you dislike about your solution?

I am not happy, that i didn't really work using TDD<br>
I tested only one function, which i am not very proud of.

Also the styling-options are not as sophisticated as i would have liked.<br>
The User of the AutoComplete-Component has the possibility to change and style<br>
the content of the auto-complete-result-item, but he is not able to change the look<br>
and feel of the search-input-field.<br>
Also the background-color of the selected Item can not be changed (only if you change it in the source of the component)

Finaly i would have liked to handle bad inputs of the user better, by checking for illegal<br> 
characters and informing the user if this is the case

### If you had a full day more to work on this, what would you improve?

- More Test-Methods
- Add a loading-Gif
- Improve the visual design
- Implement more styling-options

### If you would start from scratch now, what would you do differently?

I would go for a reusable component directly. It took me quite some time to refactor<br>
it to be reusable.