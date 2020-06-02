import React from "react";
import { merge } from "lodash";
import AgoraRTC from "agora-rtc-sdk";

import "./canvas.css";
import "../../assets/fonts/css/icons.css";

const tile_canvas = {
	"1": ["span 12/span 12/13/13"],
	"2": ["span 12/span 12/13/25", "span 12/span 12/13/13"],
	"3": ["span 6/span 12", "span 6/span 12", "span 6/span 12/7/19"],
	"4": [
		"span 6/span 12",
		"span 6/span 12",
		"span 6/span 12",
		"span 6/span 12/7/13",
	],
	"5": [
		"span 3/span 4/13/9",
		"span 3/span 4/13/13",
		"span 3/span 4/13/17",
		"span 3/span 4/13/21",
		"span 9/span 16/10/21",
	],
	"6": [
		"span 3/span 4/13/7",
		"span 3/span 4/13/11",
		"span 3/span 4/13/15",
		"span 3/span 4/13/19",
		"span 3/span 4/13/23",
		"span 9/span 16/10/21",
	],
	"7": [
		"span 3/span 4/13/5",
		"span 3/span 4/13/9",
		"span 3/span 4/13/13",
		"span 3/span 4/13/17",
		"span 3/span 4/13/21",
		"span 3/span 4/13/25",
		"span 9/span 16/10/21",
	],
};


class AgoraCanvas extends React.Component {
	constructor(props) {
		super(props);
		this.client = {};
		this.localStream = {};
		this.screenStream = {};
		this.shareClient = {};
		this.shareStream = {};
		this.state = {
			displayMode: "pip",
			streamList: [],
			readyState: false,
			  selectedStream: 0,
			  sharingScreen: false,
			channel: window.location.href.split('/').pop()
		};
	}

	componentWillMount() {
		let $ = this.props;
		this.client = AgoraRTC.createClient({ mode: $.transcode });
		this.client.init($.appId, () => {

			this.subscribeStreamEvents();
			this.client.join($.appId, window.location.href.split('/').pop(), $.uid, (uid) => {

				this.localStream = this.streamInit(uid, $.attendeeMode, $.videoProfile);
				this.localStream.init(
					() => {
						if ($.attendeeMode !== "audience") {
							this.addStream(this.localStream, true);
							this.client.publish(this.localStream, (err) => {
								console.log("Publish local stream error: " + err);
							});
						}
						this.setState({ readyState: true });
					},
					(err) => {
						console.log("getUserMedia failed", err);
						this.setState({ readyState: true });
					}
				);
			});
		});
	}

	componentDidMount() {
		let canvas = document.querySelector("#ag-canvas");
		let btnGroup = document.querySelector(".ag-btn-group");
		canvas.addEventListener("mousemove", () => {
			if (global._toolbarToggle) {
				clearTimeout(global._toolbarToggle);
			}
			btnGroup.classList.add("active");
			global._toolbarToggle = setTimeout(function () {
				btnGroup.classList.remove("active");
			}, 2000);
		});
	}

	componentDidUpdate() {
		let canvas = document.querySelector("#ag-canvas");
		if (this.state.displayMode === "pip") {
			let no = this.state.streamList.length;
			if (no > 17 || window.location.href.split("/")[4] === "tutoring") {
				this.setState({ displayMode: "tile" });
				return;
			}
			this.state.streamList.map((item, index) => {
				let id = item.getId();
				let dom = document.querySelector("#ag-item-" + id);
				let ths = this;
				let strmLst = this.state.streamList
				let indexFinder = strmLst.findIndex(function(streams, indexFinder) {
					return streams.elementID === "ag-item-" + id
				})
				if (!dom) {
					dom = document.createElement("section");
					dom.setAttribute("id", "ag-item-" + id);
					dom.setAttribute("class", "ag-item");
					canvas.appendChild(dom);
					item.play("ag-item-" + id);

				}
				if (this.state.selectedStream === index) {
					dom.setAttribute("style", `grid-area: span 12/span 12/13/12`);
				} else if (index > 11 && index < 16) {
					dom.setAttribute(
						"style",
						`grid-area: span 3/span 3/${4 + 3 * (index - 12)}/24;
                    z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
					);
					dom.addEventListener("click", function() {
						ths.setState({ selectedStream: indexFinder });
					});
				} else if (index > 7 && index < 12) {
					dom.setAttribute(
						"style",
						`grid-area: span 3/span 3/${4 + 3 * (index - 8)}/21;
                    z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
					);
					dom.addEventListener("click", function() {
						ths.setState({ selectedStream: indexFinder });
					});
				} else if (index > 3 && index < 8) {
					dom.setAttribute(
						"style",
						`grid-area: span 3/span 3/${4 + 3 * (index - 4)}/18;
                    z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
					);
					dom.addEventListener("click", function() {
						ths.setState({ selectedStream: indexFinder });
					});
				} else {
					dom.setAttribute(
						"style",
						`grid-area: span 3/span 3/${4 + 3 * (index)}/15;
          			z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
					);
					dom.addEventListener("click", function() {
						ths.setState({ selectedStream: indexFinder });
					});
				}
				item.player.resize && item.player.resize();
			});
		}
		else if (this.state.displayMode === "tile") {
			let no = this.state.streamList.length;
			this.state.streamList.map((item, index) => {
				let id = item.getId();
				let dom = document.querySelector("#ag-item-" + id);
				if (!dom) {
					dom = document.createElement("section");
					dom.setAttribute("id", "ag-item-" + id);
					dom.setAttribute("class", "ag-item");
					canvas.appendChild(dom);
					item.play("ag-item-" + id);
				}
				dom.setAttribute("style", `grid-area: ${tile_canvas[no][index]}`);
				item.player.resize && item.player.resize();
			});
		}
		else if (this.state.displayMode === "share") {
		}
	}

	componentWillUnmount() {
		this.client && this.client.unpublish(this.localStream);
		this.localStream && this.localStream.close();
		this.client &&
			this.client.leave(
				() => {
					console.log("Client succeed to leave.");
				},
				() => {
					console.log("Client failed to leave.");
				}
			);
	}

	streamInit = (uid, attendeeMode, videoProfile, config) => {
		let defaultConfig = {
			streamID: uid,
			audio: true,
			video: true,
			screen: false,
		};

		switch (attendeeMode) {
			case "audio-only":
				defaultConfig.video = false;
				break;
			case "audience":
				defaultConfig.video = true;
				defaultConfig.audio = true;
				break;
			case "screenshare":
				defaultConfig.video = false;
				defaultConfig.screen = true;
				defaultConfig.screenaudio = true;
				defaultConfig.audio = false;
				break;
			default:
			case "video":
				break;
		}

		let stream = AgoraRTC.createStream(merge(defaultConfig, config));
		stream.setVideoProfile(videoProfile);
		return stream;
	};

	subscribeStreamEvents = () => {
		let rt = this;
		rt.client.on("stream-added", function (evt) {
			let stream = evt.stream;
			rt.client.subscribe(stream, function (err) {
				console.log("Subscribe stream failed", err);
			});
		});

		rt.client.on("peer-leave", function (evt) {
			rt.removeStream(evt.uid);
		});

		rt.client.on("stream-subscribed", function (evt) {
			let stream = evt.stream;
			rt.addStream(stream);
		});

		rt.client.on("stream-removed", function (evt) {
			let stream = evt.stream;
			rt.removeStream(stream.getId());
		});
	};

	removeStream = (uid) => {
		this.state.streamList.map((item, index) => {
			if (item.getId() === uid) {
				item.close();
				let element = document.querySelector("#ag-item-" + uid);
				if (element) {
					element.parentNode.removeChild(element);
				}
				let tempList = [...this.state.streamList];
				tempList.splice(index, 1);
				this.setState({
					streamList: tempList,
				});
			}
		});
	};

	addStream = (stream, push = false) => {
		let repeatition = this.state.streamList.some((item) => {
			return item.getId() === stream.getId();
		});
		if (repeatition) {
			return;
		}
		if (push) {
			this.setState({
				streamList: this.state.streamList.concat([stream]),
			});
		} 
		else {
			this.setState({
				streamList: [stream].concat(this.state.streamList),
			});
		}
	};

	handleCamera = (e) => {
		e.currentTarget.classList.toggle("off");
		this.localStream.isVideoOn()
			? this.localStream.disableVideo()
			: this.localStream.enableVideo();
	};

	handleMic = (e) => {
		e.currentTarget.classList.toggle("off");
		this.localStream.isAudioOn()
			? this.localStream.disableAudio()
			: this.localStream.enableAudio();
	};

	switchDisplay = (e) => {
		if (
			e.currentTarget.classList.contains("disabled") ||
			this.state.streamList.length <= 1
		) {
			return;
		}
		if (this.state.displayMode === "pip") {
			this.setState({ displayMode: "tile" });
		} else if (this.state.displayMode === "tile") {
			this.setState({ displayMode: "pip" });
		} else if (this.state.displayMode === "share") {
		} else {
			console.error("Display Mode can only be tile/pip/share");
		}
	};

	hideRemote = (e) => {
		if (
			e.currentTarget.classList.contains("disabled") ||
			this.state.streamList.length <= 1
		) {
			return;
		}
		let list;
		let id = this.state.streamList[this.state.streamList.length - 1].getId();
		list = Array.from(
			document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
		);
		list.map((item) => {
			if (item.style.display !== "none") {
				item.style.display = "none";
			} else {
				item.style.display = "block";
			}
		});
	};

	handleExit = (e) => {
		if (e.currentTarget.classList.contains("disabled")) {
			return;
		}
		try {
			this.client && this.client.unpublish(this.localStream);
			this.localStream && this.localStream.close();
			this.client &&
				this.client.leave(
					() => {
						console.log("Client succeed to leave.");
					},
					() => {
						console.log("Client failed to leave.");
					}
				);
		} finally {
			this.setState({ readyState: false });
			this.client = null;
			this.localStream = null;
			window.location.hash = "/channel";
		}
	};
	shareScreen = (e) => {

		if (this.state.sharingScreen === false) {

			let $ = this.props;
			this.client = AgoraRTC.createClient({ mode: $.transcode });
			this.client.init($.appId, () => {
				this.subscribeStreamEvents();
				this.client.join($.appId, $.channel, $.uid, (uid) => {
					this.screenStream = this.streamInit(uid, "screenshare", $.videoProfile);
					this.screenStream.init(
						() => {
							
							this.addStream(this.screenStream, true);
							this.setState({ sharingScreen: true });
							this.client.publish(this.screenStream, (err) => {
								console.log("Publish screen stream error: " + err);
							});
							
							this.setState({ readyState: true });
						},
						(err) => {
							console.log("getUserMedia failed", err);
							this.setState({ readyState: true });
							
						}
						);
					})
				})
			} else {

				this.client.unpublish(this.screenStream)
				this.setState({ sharingScreen: false });

			}
		} 
			
	render() {
		const style = {
			display: "grid",
			gridGap: "10px",
			alignItems: "center",
			justifyItems: "center",
			gridTemplateRows: "repeat(12, auto)",
			gridTemplateColumns: "repeat(24, auto)",
		};
		const videoControlBtn =
			this.props.attendeeMode === "video" ? (
				<span
					onClick={this.handleCamera}
					className='ag-btn videoControlBtn'
					title='Enable/Disable Video'
				>
					<i className='ag-icon ag-icon-camera'></i>
					<i className='ag-icon ag-icon-camera-off'></i>
				</span>
			) : (
					""
				);

		const audioControlBtn =
			this.props.attendeeMode !== "audience" ? (
				<span
					onClick={this.handleMic}
					className='ag-btn audioControlBtn'
					title='Enable/Disable Audio'
				>
					<i className='ag-icon ag-icon-mic'></i>
					<i className='ag-icon ag-icon-mic-off'></i>
				</span>
			) : (
					""
				);

		const switchDisplayBtn = (
			<span
				onClick={this.switchDisplay}
				className={
					this.state.streamList.length > 4
						? "ag-btn displayModeBtn disabled"
						: "ag-btn displayModeBtn"
				}
				title='Switch Display Mode'
			>
				<i className='ag-icon ag-icon-switch-display'></i>
			</span>
		);
		const hideRemoteBtn = (
			<span
				className={
					this.state.streamList.length > 4 || this.state.displayMode !== "pip"
						? "ag-btn disableRemoteBtn disabled"
						: "ag-btn disableRemoteBtn"
				}
				onClick={this.hideRemote}
				title='Hide Remote Stream'
			>
				<i className='ag-icon ag-icon-remove-pip'></i>
			</span>
		);
		const exitBtn = (
			<span
				onClick={this.handleExit}
				className={
					this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
				}
				title='Exit'
			>
				<i className='ag-icon ag-icon-leave'></i>
			</span>
		);
		const screenshareBtn = (
			<span
				onClick={this.shareScreen}
				className={
					this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
				}
				title='Share Screen'
			>
				<i className='ag-icon ag-icon-screen-share'></i>
			</span>
		);

		return (
			<div id='ag-canvas' style={style}>
				<div className='ag-btn-group'>
					{exitBtn}
					{videoControlBtn}
					{audioControlBtn}
					{screenshareBtn}
					{switchDisplayBtn}
					{hideRemoteBtn}
				</div>
			</div>
		);
	}
}

export default AgoraCanvas;
