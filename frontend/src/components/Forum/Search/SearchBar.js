import { useDispatch } from 'react-redux'
import { Button, Input, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import '../../../style/Forum/SearchBar.css'
import SearchOnTags from './SearchOnTags'

const { Search } = Input
function SearchBar ({ threadType }) {
  const dispatch = useDispatch()
  const [selectedTags, setTags] = useState([]);

  return (
    <div className='search-container'>
      <SearchOnTags selectedTags={selectedTags} setTags={setTags}/>

      <Search
        className='search-bar-keyword-input'
        placeholder="Search keyword"
        allowClear
        size='small'
        onSearch={(keyword) => {
          const params = {
            threadType,
            keyword,
            searchOn: selectedTags
          }
          console.log("see params: ", params);
        }}
      />
    </div>
  )
}
export default SearchBar
