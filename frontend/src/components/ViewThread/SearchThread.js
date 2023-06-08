import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchThread, filterThread } from '../../store/viewSlice'
import { Input } from 'antd'
import { Radio } from 'antd'
import { Button } from 'antd'

const { Search } = Input

function SearchThread () {
  const [option, setOption] = useState('lost')
  const dispatch = useDispatch()

  return (
    <div className="side-content">
      <h2>Side</h2>
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
      <div className="filter-container">
        <h3>Filter</h3>
        <div className="filter-thread-type">
          <Radio.Group onChange={(event) => {
            setOption(event.target.value)
          }} value={option}>
            <Radio value={'lost'}>Lost</Radio>
            <Radio value={'witness'}>Witness</Radio>
          </Radio.Group>
          <Button type="primary" onClick={() => {
            dispatch(filterThread(option))
          }}>Search</Button>
        </div>
      </div>
    </div>
  )
}

export default SearchThread