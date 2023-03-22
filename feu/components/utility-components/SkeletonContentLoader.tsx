
import ContentLoader, { Rect } from 'react-content-loader/native';


import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const SkeletonContentLoader = () => {

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const MyLoader = () => (
    <ContentLoader
      viewBox="0 0 100 100%"
      speed={2}
      // backgroundColor='#F5EBEB'
      foregroundColor='#F4B183'

    >
      {/* Only SVG shapes */}
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height="50" />
      <Rect x="0" y="60" rx="5" ry="5" width="100%" height="50" />
      <Rect x="0" y="120" rx="5" ry="5" width="100%" height="50" />
      <Rect x="0" y="180" rx="5" ry="5" width="100%" height="50" />
      <Rect x="0" y="240" rx="5" ry="5" width="100%" height="50" />
    </ContentLoader>
  )
  return (
    <View style={styles.container}>
      <MyLoader />
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    height: 300,
    paddingHorizontal: 10,
    // paddingTop: 10,
    borderRadius: 10,
    // alignItems: "flex-start"
    // width: "100%",
    // overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "red",

  }
})




export default SkeletonContentLoader