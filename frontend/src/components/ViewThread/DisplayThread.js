import { useState } from 'react'
import { threads } from '../../mocks/viewMock'
import { Avatar, Card, Pagination } from 'antd'
import { ExpandOutlined, StarOutlined } from '@ant-design/icons'

const { Meta } = Card

function DisplayThread () {
  //reference: ChatGPT (separate list of items into different pages)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6 // number of cards to display per page
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const displayedCards = threads.slice(startIndex, endIndex)

  return (
    <div>
      <h2>View</h2>
      <Pagination
        current={currentPage}
        pageSize={cardsPerPage}
        total={threads.length}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
      <div className="view-as-card">
        {displayedCards.map((card, index) => (
          <Card className="thread"
                key={index}
                style={{ width: 400 }}
                cover={<img src={card.img} alt="pet" />}
                actions={[
                  <StarOutlined key="star" />,
                  <ExpandOutlined key="expand" />
                ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={card.title}
              description={card.description}
            />
          </Card>
        ))}

      </div>
    </div>
  )
}

export default DisplayThread