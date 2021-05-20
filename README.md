# AddressBook

This is an address book app built in Angular and run in Electron. It was built as a learning exercise  in Angular and electron and contains rough code.

## Building and Running

You can build and run the Angular portion of the app and run it in a browser by running 

```
ng serve --o
```

To run it in Electron, you need to run the following

```
npm run start:build:electron
```

This will build the Angular project and then start Electron up which will serve the Angular project.
If you've built the Angular project already, then you can start the Electron app with just:

```
npm run start:electron
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Notes on development

I hadn't used Electron or Angular before writing this, and the focus of this was to learn, and not produce a polished app.

It contains the ability to add and remove address entries, search by first name or last, and sort by first name or last.

There is an export button that currently takes all addresses, and dumps them as a JSON file in the `/output` folder. There is no way currently to set the location or import, I decided to focus on just understanding how to interface with Electron from within an Angular service. Also, no feedback is given in the UI to the user.

I unfortunately ran out of time to add tests, I did spend some time reading up about them, but needed a bit more time to implement them.

It doesn't currently handle large data sets unfortunately, I think I should use `cdk-virtual-scroll-viewport` but I didn't have time to set that up properly. Ideally, it would only pull and render items that would display within a reasonably sized frame.

There is a number of other areas that I would ideally improve or look into more. I've also left TODO's throughout the code.

- Mostly I think the components are structured OK, though I would have liked to learn more about disconnecting them from the data/services. I can see a way of doing it, but I didn't have time to see if that was a typical Angular approach.
- Although I am using a Material component for the menu for sorting, I didn't have time to learn more about setting up and working correctly with Material components.
- The file structure could get messy if I was to expand beyond this simple setup. Ideally, I would move the services into a subfolder and in general, give more thought to the structure of the files. For now, I have left it mostly as it is generated.
- I would have liked to have spent longer looking at asynchronous loading of data into the components. As it stands I'm fetching the initial  data from a mock data file with a subscribe, but some of the other operations should probably become asynchronous, especially things like exporting the data.
- Required modules are all being imported at the top level in `app.module.ts` but perhaps should be broken down into the components where they are used. I would have like to have read up more on good practices here.
- The code should have better commenting than it currently is.
- I quickly threw in prettier linting, but It could have done with some refining.

