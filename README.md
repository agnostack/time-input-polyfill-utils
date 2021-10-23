# time-input-polyfill-utils

A library of helper functions designed to make the building of time input polyfill components easier.

When building the React Component version of the polyfill, I realised that there was a huge amount of functionality that could have been shared between the original time input polyfill and the new React component. I didn't really build the original polyfill in a way that made sharing functionality easy though.

This utility library is designed to make as much of the functionality as sharable as possible between different implementations. It also features robust testing using cypress to make sure that no nasty bugs creep their way into the code base.

## Testing

`npm run start` to open the Cypress ui and then you can run the unit tests from there.

`npm run test` to run the tests in a terminal instead.
