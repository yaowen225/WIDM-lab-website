import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import PaperListLayout from '@/layouts/PaperListLayout'
import { PageSEO } from '@/components/SEO'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

export const POSTS_PER_PAGE = 20

const Papers = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  })
  const [initialDisplayPosts, setInitialDisplayPosts] = useState([])

  const fetchPapers = async () => {
    try {
      const response = await defaultHttp.get(processDataRoutes.paper);

      // 確保每個 paper 都有唯一的 `id`
      const papersWithId = response.data.response.map((paper, index) => ({
        ...paper,
        uniqueId: `${paper.attachment}-${paper.id}-${index}`, // 生成唯一鍵
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

  useEffect(() => {
    fetchPapers()
  }, [])

  if (error) {
    return <div>載入失敗: {error}</div>
  }

  return (
    <>
      <PageSEO title={`Papers - ${siteMetadata.author}`} description={siteMetadata.description} />
      <PaperListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Papers"
      />
    </>
  )
}

export default Papers
