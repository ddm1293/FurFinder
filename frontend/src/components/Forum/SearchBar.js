import { useDispatch } from 'react-redux'
import { searchThread } from '../../store/forumSlice'
import { Input } from 'antd'

const { Search } = Input
function SearchBar () {
  const dispatch = useDispatch()

  return (
      <div className="search-container">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            dispatch(searchThread(value))
          }}
        />
    </div>
  )
}
export default SearchBar
