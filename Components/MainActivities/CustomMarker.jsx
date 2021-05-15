import React, {useEffect, useState} from 'react';
import {Marker} from "react-native-maps";
import {View} from "react-native";

const CustomMarker = ({request , LocalUser, stateChanger, setRequest}) => {

    const [color, SetColor] = useState(null)
    useEffect(() => {
        switch (request['level']) {
            case 'easy':
                SetColor('#1dff00')
                break
            case 'medium':
                SetColor('#e7ff00')
                break
            case 'hard':
                SetColor('#ff0000')
                break
        }

    }, [])


    return (
        <View>
            {color && <Marker onPress={()=>{setRequest(request); stateChanger('Anchoring')}} key={color} pinColor={color} coordinate={{latitude: request['latitude'], longitude: request['longitude']}}>

            </Marker>}
        </View>
    );
};

export default CustomMarker;
