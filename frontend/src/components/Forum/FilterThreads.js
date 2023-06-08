import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterThread } from '../../store/forumSlice'
import { Radio } from 'antd'
import { Button } from 'antd'

function FilterThreads () {
  const [option, setOption] = useState('lost')
  const dispatch = useDispatch()

  return (
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
  )
}

export default FilterThreads