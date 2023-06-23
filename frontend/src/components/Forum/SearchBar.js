import { useDispatch } from 'react-redux'
import { searchThread } from '../../store/forumSlice'
import { Button, Input, Tooltip } from 'antd'
import CheckableTag from 'antd/es/tag/CheckableTag'
import { useState } from 'react'
import '../../style/SearchBar.css'

const { Search } = Input
function SearchBar () {
  const dispatch = useDispatch()
  const [selectedTags, setTags] = useState([]);

  const tags = ['title', 'content'];
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setTags(nextSelectedTags);
  };

  return (
    <div className='search-container'>
      <div className='search-tag-container'>
        <span
          className='search-tag-label'
          style={{
            marginRight: 8,
          }}
        >
          Search On:
        </span>

        <div className='search-tags'>
          {tags.map((tag) => (
            <CheckableTag key={tag}
                          checked={selectedTags.includes(tag)}
                          onChange={(checked) =>
                            handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}

        </div>

      </div>

      <Search
        className='search-bar-keyword-input'
        placeholder="Search keyword"
        allowClear
        size='small'
        onSearch={(value) => {
          dispatch(searchThread(value))
        }}
      />

      <Tooltip title='Advanced Search'
               placement="bottom"
               autoAdjustOverflow>
        <Button
          className='search-bar-advanced-search'
          size='small'
          type="primary">
          Advanced
        </Button>
      </Tooltip>
    </div>
  )
}
export default SearchBar
