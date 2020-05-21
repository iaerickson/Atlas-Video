import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import {Videocontainer } from "../components/Videocontainer"
import AgoraRTC from 'agora-rtc-sdk'

function Video(props) {
  
  // app / channel settings
var agoraAppId = "13b2f58e1c114e8c9e6d34356d0aafaa"; // Set your Agora App ID @ Leighton, do you want to plug yours in here or should I use mine?
var channelName = 'AtlasDemo';

// video profile settings
var cameraVideoProfile = '480p_4'; // 640 × 480 @ 30fps  & 750kbs
var screenVideoProfile = '480_2'; // 640 × 480 @ 30fps

// create client instances for camera (client) and screen share (screenClient)
var client = AgoraRTC.createClient({mode: 'live', codec: "h264"}); // h264 better detail at a higher motion
// var screenClient = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'}); // use the vp8 for better detail in low motion

// stream references (keep track of active streams) 
// var remoteStreams = {}; // remote streams obj struct [id : stream] 

var localStreams = {
  camera: {
    id: "",
    stream: {}
  },
  screen: {
    id: "",
    stream: {}
  }
};

// var mainStreamId; // reference to main stream
// var screenShareActive = false; // flag for screen share 
var enableUiControls;
var streamId;
var stream;

// join a channel
function joinChannel() {
  var token = generateToken();
  var userID = null; // set to null to auto generate uid on successfull connection

  client.join('00613b2f58e1c114e8c9e6d34356d0aafaaIABr547+2l9nolzJJmLh7Z7+wHCew+Haj5X/CAAnNeSXoc9niwMAAAAAEAB93H0FhSbHXgEAAQCFJsde', 'banana', userID, function(uid) {
      console.log(uid);
      console.log("User " + uid + " join channel successfully");
      createCameraStream(uid);
      localStreams.camera.id = uid; // keep track of the stream uid 
  }, function(err) {
      console.log("[ERROR] : join channel failed", err);
  });
}

// video streams for channel
function createCameraStream(uid) {

  var localStream = AgoraRTC.createStream({
    streamID: uid,
    audio: true,
    video: true,
    screen: false
  });
  localStream.setVideoProfile(cameraVideoProfile);

  localStream.init(function() {
    console.log("getUserMedia successfully");
    // TODO: add check for other streams. play local stream full size if alone in channel
    localStream.play('local-video'); // play the given stream within the local-video div
    // publish local stream
    client.publish(localStream, function (err) {
      console.log("[ERROR] : publish local stream error: " + err);
    });
  
    // enableUiControls(localStream); // move after testing
    localStreams.camera.stream = localStream; // keep track of the camera stream for later
  }, function (err) {
    console.log("[ERROR] : getUserMedia failed", err);
  });
}

// function leaveChannel() {
//   client.leave(function() {
//     console.log("client leaves channel");
//   }, function(err) {
//     console.log("client leave failed ", err); //error handling
//   });
// }

// use tokens for added security
function generateToken() {
  const {RtcTokenBuilder, RtcRole} = require('agora-access-token')

  const appID = '13b2f58e1c114e8c9e6d34356d0aafaa';
  const appCertificate = 'ba86f4e2ad2c449ea5cade3a35063a4e';
  const channelName = 'AtlasDemo';
  const uid = 2882341273;
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

  return tokenA; // We will need to add a token generator server here, Leighton. Check out these docs https://github.com/AgoraIO/Tools/tree/master/DynamicKey/AgoraDynamicKey/nodejs/src
}

// init Agora SDK
client.init(agoraAppId, function () {
  console.log("AgoraRTC client initialized");
  joinChannel(); // join channel upon successfull init
}, function (err) {
  console.log("[ERROR] : AgoraRTC client init failed", err);
});

client.on('stream-published', function (evt) {
  console.log("Publish local stream successfully");
  
});

// connect remote streams
client.on('stream-added', function (evt) {
  console.log("new stream added: " + streamId);
  // Check if the stream is local
  if (streamId != localStreams.screen.id) {
    console.log('subscribe to remote stream:' + streamId);
    // Subscribe to the stream.
    client.subscribe(stream, function (err) {
      console.log("[ERROR] : subscribe stream failed", err);
    });
  }
});

client.on('stream-subscribed', function (evt) {
  console.log("Subscribe remote stream successfully: " + evt.stream.getId());
});

// remove the remote-container when a user leaves the channel
client.on("peer-leave", function(evt) {
  console.log("Remote stream: " + evt.stream.getId() + "has left");
});

// show mute icon whenever a remote has muted their mic
client.on("mute-audio", function (evt) {
  console.log("Remote stream: " +  evt.uid + "has muted audio");
});

client.on("unmute-audio", function (evt) {
  console.log("Remote stream: " +  evt.uid + "has muted audio");
});

// show user icon whenever a remote has disabled their video
client.on("mute-video", function (evt) {
  console.log("Remote stream: " +  evt.uid + "has muted video");
});

client.on("unmute-video", function (evt) {
  console.log("Remote stream: " +  evt.uid + "has un-muted video");
});

  return (
      <Videocontainer>

      </Videocontainer>
    );
  }


export default Video;
