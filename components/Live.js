import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { white, purple } from '../utils/colors'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { calculateDirection } from '../utils/helpers'

export default class Live extends React.Component {
    state = {
        coords: null,
        status: null,
        direction: '',
    }

    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({ status }) => {
                if (status === 'granted') {
                    return this.setLocation()
                }
                this.setState(() => ({ status }))
            })
            .catch((error) => {
                console.warn('Error getting Location permissions: ', error)

                this.setState(() => ({ status: 'undetermined' }))
            })

    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({ status }) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                this.setState(() => ({ status }))
            })
            .catch((error) => console.warn('error asking location permissions ', error))
    }

    setLocation = () => {
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 1,
            distanceInterval: 1,
        }), ({ coords }) => {
            const newDirection = calculateDirection(coords.heading)
            const { direction } = this.state

            this.setState(() => ({
                coords,
                status: 'granted',
                direction: newDirection
            }))
        }
    }

    render() {
        const { status, coords, direction } = this.state

        if (status === null) {
            return <ActivityIndicator size='large' style={{ marginTop: 50 }} color="#0000ff" />
        }

        if (status === 'denied') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text style={styles.text}>You denied location permission for this app. To view this content, please visit your settings and enable location services.</Text>
                </View>
            )
        }

        if (status === 'undetermined') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text style={styles.text}>You need to enable location services to view this content</Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.header}>You're heading</Text>
                    <Text style={styles.direction}>NORTH</Text>
                </View>
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>
                            Altitude
                        </Text>
                        <Text style={[styles.subHeader, { color: white }]}>
                            {200} feet
                        </Text>
                    </View>
                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>
                            Speed
                        </Text>
                        <Text style={[styles.subHeader, { color: white }]}>
                            {300} MPH
                        </Text>
                    </View>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    },
    text: {
        textAlign: 'center'
    },
    direction: {
        color: purple,
        fontSize: 120,
        textAlign: 'center'
    },
    directionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
    }
})
