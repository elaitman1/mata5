import React from "react";
import CameraPhoto, { FACING_MODES } from "jslib-html5-camera-photo";

class Camera extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ""
    };
  }

  componentDidMount() {
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);

    this.startCameraMaxResolution(FACING_MODES.ENVIRONMENT);
  }

  startCameraMaxResolution(idealFacingMode) {
    this.cameraPhoto
      .startCameraMaxResolution(idealFacingMode)
      .then(() => {
        console.log("camera is started !");
      })
      .catch(error => {
        console.error("Camera not started!", error);
      });
  }

  takePhoto = async () => {
    const config = {
      sizeFactor: 1
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    console.log(dataUri);
    await this.setState({ dataUri });
    this.props.toggleCamera();
  };

  stopCamera() {
    this.cameraPhoto
      .stopCamera()
      .then(() => {
        console.log("Camera stoped!");
      })
      .catch(error => {
        console.log("No camera to stop!:", error);
      });
  }

  render() {
    return (
      <div className="camera-container">
        <div className="camera-header">
          <span onClick={this.props.toggleCamera}>&lsaquo;</span>
          <h4>Scanner</h4>
        </div>
        <video className="camera-preview" ref={this.videoRef} autoPlay="true" />
        ​<div className="camera-bottom">
          {this.state.dataUri === "" ? (
            <button
              onClick={() => {
                this.takePhoto();
              }}
              className="camera-button-outer-circle"
            >
              <button className="camera-button-inner-circle" />
            </button>
          ) : (
            ""
          )}
        </div>
        {this.state.dataUri === "" ? (
          ""
        ) : (
          <img src={this.state.dataUri} alt="DataURI" />
        )}
        ​
      </div>
    );
  }
}

export default Camera;
