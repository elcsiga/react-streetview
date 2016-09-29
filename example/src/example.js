import React from 'react';
import ReactDOM from 'react-dom';
import ReactStreetview from 'react-streetview';

class App extends React.Component {

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
			<div style={{
				width: '800px',
				height: '450px',
				backgroundColor: '#eeeeee'
			}}>
				<ReactStreetview
					apiKey={googleMapsApiKey}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
