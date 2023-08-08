import CheckableTag from 'antd/es/tag/CheckableTag'

function SearchOnTags ({ selectedTags, setTags }) {
  const tags = ['title', 'content'];
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setTags(nextSelectedTags);
  };

  return (
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
  )
}

export default SearchOnTags
