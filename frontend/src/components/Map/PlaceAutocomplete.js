import { useEffect } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { AutoComplete } from 'antd'

function PlaceAutocomplete ({ setSelected }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  useEffect(() => {
    // console.log('see value change: ', value);
  }, [value])

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
    console.log('see lat, lng: ', lat, lng)
    setSelected({ lat, lng });
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
      />
    </div>
  )
}

export default PlaceAutocomplete
