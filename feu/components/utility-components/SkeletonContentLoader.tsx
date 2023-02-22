
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';


import React from 'react';
import { Dimensions, View } from 'react-native';

const SkeletonContentLoader = () => {

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const MyLoader = () => (
    <ContentLoader viewBox={`0 0 ${deviceWidth} 100`}>
      <Circle cx="30" cy="35" r="10" />
      <Rect x="60" y="17" rx="4" ry="4" width="150" height="15" />
      <Rect x="60" y="40" rx="3" ry="3" width="200" height="10" />
      <Rect x="300" y="24" rx="4" ry="3" width="60" height="20" />

      <Rect x="20" y="60" rx="4" ry="3" width="350" height="1" />

      <Circle cx="30" cy="77" r="10" />
      <Rect x="60" y="67" rx="4" ry="4" width="150" height="15" />
      <Rect x="60" y="90" rx="3" ry="3" width="200" height="10" />
      <Rect x="300" y="74" rx="4" ry="3" width="60" height="20" />
    </ContentLoader>
  )
  return (
    <View style={{ height: 150 }}>
      <MyLoader />
    </View >
  )
}

export default SkeletonContentLoader