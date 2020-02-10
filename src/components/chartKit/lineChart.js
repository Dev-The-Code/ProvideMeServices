import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { BarChart } from 'react-native-svg-charts'


class Linechart extends React.Component {
    constructor(props) {
        super(props)

    }
    
    render() {
        const data = [0,0,55,0,0]
        return (
            <View style={{flex:1,}}>
            <View style={{flexDirection:'row'}}>
                    <View style={{ height: 220,width:100, padding: 20 }}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={data}
                            gridMin={0}
                            svg={{ fill: '#FF6200' }}
                            spacingInner={0.3}
                        />

                    </View>
                    <View style={{ height: 220,width:100, padding: 20 }}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={data}
                            gridMin={0}
                            svg={{ fill: '#FF6200' }}
                            spacingInner={0.3}
                        />
                    </View>
                    <View style={{ height: 220,width:100, padding: 20 }}>
                        <BarChart
                            style={{ flex: 1 }}
                            data={data}
                            gridMin={0}
                            svg={{ fill: '#FF6200' }}
                            spacingInner={0.3}
                            gridMax={10}
                        />
                    </View>
                

            </View>
              <View style={{height:40,backgroundColor:'black',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#e5e5e5',fontFamily: 'MontserratLight',}}>04:00</Text>
                <Text style={{color:'#e5e5e5',fontFamily: 'MontserratLight',}}>08:00</Text>
                <Text style={{color:'#e5e5e5',fontFamily: 'MontserratLight',}}>12:00</Text>
              </View>
        </View>  
        )

    }


}

export default Linechart;

