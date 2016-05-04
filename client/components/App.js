import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeaderContainer } from './Header';
import { GameWindowContainer } from './GameWindow';
import { mapStateToProps, mapDispatchToProps } from '../props';

export class App extends React.Component {
  constructor(props) {
    super(props);

    // Current state of the app
    // ===================================
    // this.state = {
    //   currentUser: props.game.username,
    //   userImage: props.game.image,
    // };
  }

  // Initial rendering of the app
  // ===================================
  render() {
    return (
      <div>
        <div>
          <HeaderContainer />
        </div>
        <div>
          <GameWindowContainer user={this.props.username} />
        </div>
      </div>
    );
  }
}

// Prop validation throws an error if data you receive is invalid
App.propTypes = {
  username: PropTypes.string,
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
