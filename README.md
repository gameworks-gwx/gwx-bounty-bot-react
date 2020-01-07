# GWX Bounty Web

## Libraries/Frameworks
- [Ant Design](https://ant.design/)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)

## Prequisites
- NodeJS
- Yarn

## Installation
Clone the repo
```
$ git@github.com:gameworks-gwx/gwx-bounty-bot-react.git
```
## Running locally
To run locally
```
$ yarn start
```

## Testing

[Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) are used for testing the app's components

To run the tests:
```
$ yarn test
```

## Deployment [Staging]

CircleCI automatically redeploys the application to staging when there are any changes in `develop` branch (_e.g. merge changes_)

## Deployment [Master]

CircleCI automatically redeploys the application to production when there are any changes in `master` branch (_e.g. merge changes_)

## URLs

https://bounty-staging.gameworks.io/ (_staging_)

https://bounty.gameworks.io/ (_production_)
