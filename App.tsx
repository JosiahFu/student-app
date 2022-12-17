import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
            <Button title="AAAAAA" />
            <Text style={styles.button}>AAAAAA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#f00',
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        // width: '100px',
        // heigth: '100px',
    }
});
