'use strict';

var React = require('react');
var ReactTHREE = require('react-three');
var THREE = require('three');

module.exports = React.createClass({
  render: function(){
    var camerapropas = {
      fov: 80,
      aspect: this.props.width / this.props.height,
      near: 1,
      far: 1000,
      position: new THREE.Vector3(0,0,-200),
      lookAt: new THREE.Vector3(0,0,0)
    };

    return (
      <Scene width={this.props.width} height={this.props.height} camera='maincamera'>
        <PerspectiveCamera name='maincamera' camera={camerapropas} />
      </Scene>
    );
  }
});