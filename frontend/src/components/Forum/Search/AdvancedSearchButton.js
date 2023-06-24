import React from 'react'
import { Button, Tooltip } from 'antd'
import '../../../style/SearchBar.css'

function AdvancedSearchButton (props) {
  return (
    <div>
      <Tooltip title='Advanced Search'
               placement="bottom"
               autoAdjustOverflow>
        <Button
          className='search-bar-advanced-search'
          size='small'
          type="primary"
        >
          Advanced
        </Button>
      </Tooltip>
    </div>
  )
}

export default AdvancedSearchButton
