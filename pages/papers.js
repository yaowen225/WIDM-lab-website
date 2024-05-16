import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/PaperListLayout'
import { PageSEO } from '@/components/SEO'
import { PaperApi } from '../api-client/src'

export const POSTS_PER_PAGE = 20

const Papers = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  })
  const [initialDisplayPosts, setInitialDisplayPosts] = useState([])

  useEffect(() => {
    const fetchPapers = async () => {
      const apiClient = new PaperApi()
      try {
        const data = await apiClient.paperGet()
        console.log('API Response:', data.response)

        // 確保每個 paper 都有唯一的 `id`
        const papersWithId = data.response.map((paper, index) => ({
          ...paper,
          uniqueId: `${paper.paper_attachment}-${paper.id}-${index}`, // 生成唯一鍵
        }))

        setPosts(papersWithId)
        setInitialDisplayPosts(papersWithId.slice(0, POSTS_PER_PAGE))
        setPagination({
          currentPage: 1,
          totalPages: Math.ceil(papersWithId.length / POSTS_PER_PAGE),
        })
      } catch (error) {
        console.error('API 調用失敗:', error.message)
        if (error.response) {
          console.error('API Response Error:', error.response.body)
        }
        setError(error.message)
      }
    }

    fetchPapers()
  }, [])

  if (error) {
    return <div>載入失敗: {error}</div>
  }

  return (
    <>
      <PageSEO title={`Papers - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Papers"
      />
    </>
  )
}

export default Papers
