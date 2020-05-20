import React from "react"

export function Videocontainer () {
    return(
        <div id="container">
        <div id="main-container">
          <div id="screen-share-btn-container"className = "col-2-float-right text-right mt-2">
          <button id="screen-share-btn"  type="button" class="btn btn-lg">
		<i id="screen-share-icon" class="fas fa-share-square"></i>
	</button>
          </div>
          <div id="buttons-container" className = "row justify-content-center mt-3">
          <div class="col-md-2 text-center">
		<button id="mic-btn" type="button" class="btn btn-block btn-dark btn-lg">
			<i id="mic-icon" class="fas fa-microphone"></i>
		</button>
	</div>
    <div class="col-md-2 text-center">
		<button id="video-btn"  type="button" class="btn btn-block btn-dark btn-lg">
			<i id="video-icon" class="fas fa-video"></i>
		</button>
	</div>
	<div class="col-md-2 text-center">
		<button id="exit-btn"  type="button" class="btn btn-block btn-danger btn-lg">
			<i id="exit-icon" class="fas fa-phone-slash"></i>
		</button>
	</div>

          </div>
          <div id="full-screen-video"></div>
          <div id="lower-video-bar">
            <div id="remote-streams-container">
              <div id="remote-streams">
                  {/* We'll insert remote streams dynamically */}
              </div>
            </div>
            <div id="local-stream-container">						
              <div id="local-video"></div>
            </div>
          </div>
        </div>
      </div>
    )
}
