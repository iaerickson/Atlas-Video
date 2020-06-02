# Atlas Video

Atlas Video is a video-chat app focused on creating an easy-to-use, quick,
accessible interface for online and remote education. The focus is to give video
and room control to the teacher/host as they see fit to best educate the
classroom. In this current version, Atlas Video provides two chatrooms:
classroom (for larger classes) and tutoring (for office hours and 1-on-1)

Heroku: https://atlas-video.herokuapp.com/#/

Github: https://github.com/iaerickson/Atlas-Video

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See deployment for notes on
how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Make sure you have Node and NPM installed globally:
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
```

Also make sure you have MongoDB installed if you would like to use the
user-login functionality

```
MongoDB: https://www.mongodb.com/download-center/community
```

### Installing

Fork or download the app from the Github.

In your terminal/console, run an "npm install" to install the package.json in
the main level directory (directory with server.js).

In a seperate console/terminal window, run "mongod" start the server

"cd" into the "client" directory. Run "npm install" if that package.json is not
installed.

Be sure to sign up for an Agora Developer's token! Setup Instructions: Include
Your App ID in AgoraConfig.js

More on how to do that here:

https://www.agora.io/en/blog/building-a-group-video-chat-web-app/?_ga=2.217576991.863854871.1591056168-287262436.1588891962

Once package.jsons have been installed, cd back to the main-level directory,
enter the command "react-scripts build" in your console/terminal.

Once the build has finished, run "npm react-scripts start" or "npm start" and
the app should be running locally on your computer!

### Testing the app

Once at the Login Page, login with an account or click "sign-up" at the bottom
if you don't already have an account. After verification, you will be taken to
the "Channel" page where you can set up what sort of room you want to host, as
well as advanced video and audio configurations. You can create your own channel
or have the app generate a secure channel.

Once you are ready, click "join" to enter the chat. Inside the chat room, you
have the options to copy the room-invite code to send out, as well as
mute/unmute, turn video off/on, change your display preferences, share screen,
and end the call.

### Coding style tests

If you need/want to test what objects are in the state, try running inserting
`console.log(this.state.${object})` inside a `render()` but before any `return`

## Deployment

If you have successfully installed the packages and modules, and succesfully
compiled and ran the build, you can follow the instructions for deploying on
Heroku here: https://devcenter.heroku.com/articles/git

Make sure to install and link up with mlab for online database purposes:
https://devcenter.heroku.com/articles/mongolab

## Built With

- [GitHub](https://github.com/) -The Repo we used

- [NPM/Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) -
  package manager

- [AgoraIO](https://docs.agora.io/en/) - Voice and Video Chat Platform

- [AgoraIO](https://docs.agora.io/en/Video/product_video?platform=All%20Platforms) -
  Getting started to use/test video chat

- [AgoraIO](https://github.com/AgoraIO-Community/AgoraWebSDK-NG) - Specific Repo
  we pulled from

- [Bulma](https://bulma.io/) - Frontend Framework

- [ExpressJS](https://expressjs.com/)- JS server management

- [Passport](http://www.passportjs.org/)-Password HManagement

- [MongoDB](https://www.mongodb.com/download-center/community) -Backend Server
  System

- [Heroku](https://rometools.github.io/rome/) - Used to generate RSS Feeds

- [React](https://reactjs.org/) - JS Web framework

## Contributing

Please read
[CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for
details on our code of conduct, and the process for submitting pull requests to
us.

## Versioning

We had been building out a beta version of this app in this repo:

[Heroku-Test-Repo](https://github.com/tedirland/heroku_test_repo)

We are in our first Version deployed! Stay tuned for updates

## Authors

- **Ted Irland** - _Client-Side Functionality, shared screen functionality, easy
  join sharable link, UI/UX _ - [Red Irland](https://github.com/tedirland/)

- **Leighton Shallenberger** - _Client-Side Functionality, stream placement and
  view type, UI/UX_ -
  [Leighton Shallenberger](https://github.com/lshallenberger)

- **Ian Erickson** - _Backend, verification process, database setup, login and
  signup front end pages, UI/UX_ -
  [Ian Erickson](https://github.com/iaerickson/)

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [Particle Animation](https://codepen.io/iaerickson/pen/mdegzrd) - Animation
  effect

- [Background Globe Image](https://www.pinterest.com/pin/81979655700347340/) -
  Japanese Poster: Trade Fair. Yusaku Kamekura. 1986

```
Hopefully this app can be used to help educate, communicate, and promote the free transference of Knowledge, Love and Understanding.
```
