import React from 'react';
import { SearchBar } from 'react-native-elements';
import {
    View
} from 'react-native';

const MySearch = (props) => {
    console.log(props)

    return (

        < View >
            <SearchBar
                styles={props.styles}
                round={props.round}
                lightTheme={props.lightTheme}
                placeholder={props.placeholder}
                platform={props.platform}
                inputContainerStyle={props.inputContainerStyle}
            />
        </View >
    )
}

export default MySearch;