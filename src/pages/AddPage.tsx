import React from 'react';
import SearchBar from '../components/SearchBar';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';

const AddPage = () => {
  return (
    <NoSafeAreaLayout>
      <SearchBar />
    </NoSafeAreaLayout>
  );
};

export default AddPage;
