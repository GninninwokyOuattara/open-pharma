
import ContentLoader, { Rect } from 'react-content-loader/native';


import React from 'react';
import { Dimensions, View } from 'react-native';

const SkeletonContentLoader = () => {


  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;



  const MyLoader = () => (
    <ContentLoader viewBox={`0 0 ${deviceWidth} ${deviceHeight}`}

    >
      <Rect x="10" y="0" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="60" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="120" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="180" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="240" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="300" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="360" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="420" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="480" rx="4" ry="4" width={deviceWidth - 20} height="50" />
      <Rect x="10" y="540" rx="4" ry="4" width={deviceWidth - 20} height="50" />
    </ContentLoader>
  )
  return (
    <View style={{ height: deviceHeight, width: deviceWidth }}
    >
      <MyLoader />
    </View >
  )
}






export default SkeletonContentLoader