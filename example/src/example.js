import React from 'react';
import ReactDOM from 'react-dom';
import ReactStreetview from 'react-streetview';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			position: null,
			pov: null
		};
	}

	render() {
		// USE YOUR OWN API KEY HERE, 
		// see https://developers.google.com/maps/documentation/javascript
		const googleMapsApiKey = 'AIzaSyCSb2pbuLuz-sSLyV3g7qWD3uaW9Edwr8w';

		// see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
		const streetViewPanoramaOptions = {
			position: {lat: 46.9171876, lng: 17.8951832},
			pov: {heading: 100, pitch: 0},
			zoom: 1
		};

		return (
			<div>
				<div style={{
					width: '800px',
					height: '450px',
					backgroundColor: '#eeeeee'
				}}>
					<ReactStreetview
						apiKey={googleMapsApiKey}
						streetViewPanoramaOptions={streetViewPanoramaOptions}
						onPositionChanged={position => this.setState({position: position})}
						onPovChanged={pov => this.setState({pov: pov})}
					/>
				</div>
				<div className='helper'>
					Position: {JSON.stringify(this.state.position)}<br />
					Pov: {JSON.stringify(this.state.pov)}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
