import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { AutoComplete } from 'antd'
import { useEffect } from 'react'

function PlaceAutocomplete ({ setSelected }) {
  const google = window.google;
  const southwest = { lat: 48.224, lng: -123.758 };
  const northeast = { lat: 49.612, lng: -121.438 };
  const bounds = new google.maps.LatLngBounds(southwest, northeast);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['geocode'],
      componentRestrictions: { country: 'ca' },
      bounds,
      strictBounds: true
    }
  });

  const formattedSuggestions = data.map(suggestion => ({
    value: suggestion.place_id,
    label: suggestion.description
  }));

  const onSearch = (searchText) => {
    setValue(searchText);
  }

  const onSelect = async (selected, option) => {
    setValue(option.label, false);
    clearSuggestions();

    const results = await getGeocode({ placeId: selected });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  }

  const onClear = () => {
    setValue(null);
    setSelected(null);
  }

  return (
    <div className='map-search-container'>
      <AutoComplete
        options={formattedSuggestions}
        style={{ width: '100%', marginBottom: '10px' }}
        onSelect={onSelect}
        onSearch={onSearch}
        disabled={!ready}
        value={value}
        placeholder='search an address'
        allowClear
        onClear={onClear}
      />
    </div>
  )
}

export default PlaceAutocomplete
