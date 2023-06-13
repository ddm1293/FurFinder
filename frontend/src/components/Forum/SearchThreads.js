import { useDispatch } from 'react-redux'
import { searchThread } from '../../store/forumSlice'
import { Input } from 'antd'

const { Search } = Input
function SearchThreads () {
  const dispatch = useDispatch()

  return (
      <div className="search-container">
        <h3>Search</h3>
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
export default SearchThreads