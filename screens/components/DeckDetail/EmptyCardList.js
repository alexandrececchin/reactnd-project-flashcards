import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
const EmptyCardList = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
      }}
    >
      <Text>Look's like there's no cards here!</Text>
    </View>
  );
};

export default EmptyCardList;
