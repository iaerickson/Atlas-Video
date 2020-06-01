import React, { Component } from "react";

export default class AnimationParticle extends Component {
	render() {
		return <div className={`p p-${this.props.styleName}`}></div>;
	}
}
