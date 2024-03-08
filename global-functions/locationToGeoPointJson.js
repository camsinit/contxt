import React from 'react';

const locationToGeoPointJson = location => {
  if (!location?.latitude) return null;

  if (location)
    return {
      type: 'point',
      data: {
        lat: location.latitude,
        lng: location.longitude,
      },
    };
};

export default locationToGeoPointJson;
