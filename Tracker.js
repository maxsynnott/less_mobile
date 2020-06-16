import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native'

export default class Tracker extends Component {
	state = {
		latitude: null,
		longitude: null
	};

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})

			this.broadcastCoordinates()
		})
	}

	broadcastCoordinates = () => {
		fetch("https://less-berlin.herokuapp.com/api/v1/deliveries/1",
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json" 
				},
				body: JSON.stringify({
					delivery: {
						driver_latitude: this.state.latitude,
						driver_longitude: this.state.longitude
					}
				})
			}
		)
		.then(response => response.json())
		.then((data) => {
			console.log(data)
		})
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.findCoordinates}>
					<Text>
						Broadcast your coordinates!
					</Text>

					<Text>
						Latitude: {this.state.latitude}
					</Text>

					<Text>
						Longitude: {this.state.longitude}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}
}