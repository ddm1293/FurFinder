import React from 'react'
import { Button, Tooltip } from 'antd'
import '../../../style/Forum/SearchBar.css'

function AdvancedSearchButton ({ clickAdvancedSearch }) {
  return (
    <div>
      <Tooltip title='Advanced Search'
               placement="bottom"
               autoAdjustOverflow>
        <Button
          className='search-bar-advanced-search'
          size='small'
          type="primary"
          onClick={clickAdvancedSearch}
        >
          Advanced
        </Button>
      </Tooltip>
    </div>
  )
}

export default AdvancedSearchButton
