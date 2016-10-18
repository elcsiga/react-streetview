# react-streetview

Simple React.js component for Google Street View

## Demo & Examples

Live demo: [elcsiga.github.io/react-streetview](http://elcsiga.github.io/react-streetview/)

## Installation

The easiest way to use react-streetview is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install react-streetview --save
```

You can also use the standalone build by including `dist/react-streetview.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

## Usage

``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactStreetview from 'react-streetview';

class App extends React.Component {

	render() {
		// see https://developers.google.com/maps/documentation/javascript
		const googleMapsApiKey = 'YOUR_API_KEY';

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
```

## Development (`src`, `lib` and the build process)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT

