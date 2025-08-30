import React from 'react';
import { View } from 'react-native';
import Tag from '../components/Tag';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';

const DetailsPage = () => {
  return (
    <NoSafeAreaLayout>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Tag tag="Breakfast" />
        <Tag tag="10 minutes" />
        <Tag tag="vip" />
      </View>
    </NoSafeAreaLayout>
  );
};

export default DetailsPage;
