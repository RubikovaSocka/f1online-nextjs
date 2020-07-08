import React, { Component } from 'react'
import TrackVisibility from 'react-on-screen';
import ArtRePanel from './ArtRePanel/ArtRePanel';

export default class TrackedArtRePanel extends Component {
  render() {
    return (
      <TrackVisibility partialVisibility>
        <ArtRePanel />
      </TrackVisibility>
    )
  }
}
