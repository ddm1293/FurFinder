import FilterThreads from './FilterThreads'
import SearchThreads from './SearchThreads'
import CardView from './CardView'
import CreateThreadButton from '../CreateThread/CreateThreadButton'
import { Breadcrumb, Layout, Pagination } from 'antd'
import '../../style/Forum.css'
import { useState } from 'react'
import { threads } from '../../mocks/forumMock'

const { Content } = Layout

function Forum (props) {
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6 //reference: ChatGPT (separate list of items into different pages)
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const displayedCards = threads.slice(startIndex, endIndex)

  return (
    <Layout>
      <Breadcrumb className="custom-breadcrumb"
                  items={[
                    { title: 'Home' },
                    { title: <a href="">Forum</a> }, // TODO: add link
                    { title: 'View Threads' }
                  ]}
      />
      <Content className="forum-container">
        <div className="side-container">
          <h2>Side</h2>
          <SearchThreads />
          <FilterThreads filterOptions={props.filterOptions}/>
        </div>
        <div className="forum-content">
          <h2>View</h2>
          <Pagination
            current={currentPage}
            pageSize={cardsPerPage}
            total={threads.length}
            onChange={(page) => {
              setCurrentPage(page)
            }}
          />
          <CreateThreadButton
            shouldOpenCreateThreadForm={props.shouldOpenCreateThreadForm}
            threadType={props.threadType}
          />
          <CardView items={displayedCards} />
        </div>
      </Content>
    </Layout>
  )
}

export default Forum
