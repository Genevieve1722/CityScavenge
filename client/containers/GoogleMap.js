import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createMap, placeUserMarker, deleteUserMarker, placeCheckpoint, checkpointCollision, placeFinishPoint, finishPointCollision, startGame } from '../actions/map';
import GameWindow from '../components/GameWindow';
import fetch from 'isomorphic-fetch';
import { getUserLocationAndWatchID, stopWatching, initialPosition} from '../lib/locationController';

class GoogleMap extends Component {

  componentDidMount() {
    // this.props.initialPos();
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

GoogleMap.propTypes = {
  //initialPos: PropTypes.func.isRequired,
  placeMarker: PropTypes.func.isRequired,
  userTitle: PropTypes.string.isRequired,
  userLat: PropTypes.number.isRequired,
  userLng: PropTypes.number.isRequired,
  finishLat: PropTypes.number.isRequired,
  finishLng: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    map: state.mapReducer.map,
    userTitle: state.users[0].title,
    userLat: state.users[0].lat,
    userLng: state.users[0].lng,
    finishLat: state.finishPoint.lat,
    finishLng: state.finishPoint.lng,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMap: (lat, lng) => {
      dispatch(createMap({ lat, lng }));
    },

    // Places a marker on the user's location
    placeMarker: (map, title, lat, lng) => {
      dispatch(placeUserMarker(map, title, lat, lng));
    },
    deleteMarker: (title) => {
      dispatch(deleteUserMarker(title));
    },

    placeCheckpoint: (map, title, lat, lng) => {
      dispatch(placeCheckpoint(map, title, lat, lng));
    },
    checkpointCollision: (locTitle, userTitle) => {
      dispatch(checkpointCollision(locTitle, userTitle));
    },

    placeFinishPoint: (map, lat, lng) => {
      dispatch(placeFinishPoint(map, lat, lng));
    },
    finishPointCollision: (userTitle, timeIn, locTitle) => {
      dispatch(finishPointCollision(userTitle, timeIn, locTitle));
    },
    watchUser: () => {
      getUserLocationAndWatchID(dispatch);
    },
    // initialPos: () => {
    //   // Gets player initial location
    //   initialPosition(dispatch, (positionData) => {
    //     const mapOptions = {
    //       center: { lat: positionData.latitude, lng: positionData.longitude },
    //       zoom: 15,
    //     };
    //     // create a google map
    //     const googleMap = new google.maps.Map(document.getElementById('map'), mapOptions);
        
    //   //dispatch(placeUserMarker(googleMap, 'Michael', positionData));
      
    //     // get's the final location by calling gamestart and dispatches placefinish point in action
    //     startGame(dispatch, googleMap, positionData.latitude, positionData.longitude);
        
    //   //getUserLocationAndWatchID(dispatch, googleMap, 'Michael');
    //   });
    // },
  };
};

const GoogleMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMap);

export default GoogleMapContainer;
