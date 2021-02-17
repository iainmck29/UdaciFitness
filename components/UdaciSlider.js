import React from 'react'
import { View, Text, Slider } from 'react-native'

export default function UdaciSlider({ max, unit, onChange, value, step }) {
    return (
        <View>
            <Slider
                maximumValue={max}
                onValueChange={onChange}
                value={value}
                minimumValue={0}
                step={step} />
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    )
}