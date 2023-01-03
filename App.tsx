import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, GestureResponderEvent, TouchableNativeFeedback } from 'react-native';

interface AppProps {
}
interface AppState {
    menuOpen: boolean
}
export default class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {menuOpen: false};
    }
    
    handleClick(e: GestureResponderEvent) {
        this.setState({menuOpen: true});
        return true;
    }

    render() {
        return (
            <View>
                <View style={[styles.sidebar, this.state.menuOpen ? styles.sidebarOpen : null]}>
                    <Text>Column1</Text>
                </View>
                <View style={{height: 100}}></View>
                <TouchableNativeFeedback onPress={this.handleClick}>
                    <Text>Hello</Text>
                </TouchableNativeFeedback>
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        zIndex: 10,
        left: -200,
        top: 100,
        width: 200,
        backgroundColor: 'green'
    },
    sidebarOpen: {
        left: 0
    }
});
