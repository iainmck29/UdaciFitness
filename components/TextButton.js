import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function TextButton({ onPress, children }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}