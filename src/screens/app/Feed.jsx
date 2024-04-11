import React from "react";
import { StyleSheet, View, Image } from "react-native";

const WoofrHeader = () => {
    return (
        <View style={{ width: '100%', alignItems: "flex-end" }}>
            <Image
                style={styles.logo}
                source={require('../../images/logo-wofer2.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginRight: 15,
        marginTop: 8,
        width: 140,
        height: 44,

    },
});

export default WoofrHeader;
