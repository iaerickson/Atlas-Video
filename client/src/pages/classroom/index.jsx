import React from "react";
import * as Cookies from "js-cookie";

import "./meeting.css";
import AgoraVideoCall from "../../components/AgoraVideoCall";
import { AGORA_APP_ID } from "../../agora.config";

class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.videoProfile = Cookies.get("videoProfile").split(",")[0] || "480p_4";
    this.channel = window.location.href.split('/').pop() || "test";
    this.transcode = Cookies.get("transcode") || "interop";
    this.attendeeMode = Cookies.get("attendeeMode") || "video";
    this.baseMode = Cookies.get("baseMode") || "avc";
    this.appId = AGORA_APP_ID;
    if (!this.appId) {
      return alert("Get App ID first!");
    }
    this.uid = undefined;
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Room Link Copied To Clipboard")
  };

  render() {
    return (
      <div className="wrapper meeting">
        <div className="ag-header justify-content-center">
          <div className="btn btn-primary btn-lg">

            <a
              id='inviteBtn'
              onClick={this.copyToClipboard}
              className='coptBtn'
            >
              Invite
							</a>
          </div>


        </div>
        <div className="ag-main">
          <div className="ag-container">
            <AgoraVideoCall
              videoProfile={this.videoProfile}
              channel={this.channel}
              transcode={this.transcode}
              attendeeMode={this.attendeeMode}
              baseMode={this.baseMode}
              appId={this.appId}
              uid={this.uid}
            />
          </div>
        </div>
        <div className="ag-footer">
          {/* <a className="ag-href" href="https://www.agora.io">
            {/* <span>Powered By Agora</span> */}
          {/* </a> */}
          {/* <span>Talk to Support: 400 632 6626</span> */}
        </div>
      </div>
    );
  }
}

export default Classroom;
