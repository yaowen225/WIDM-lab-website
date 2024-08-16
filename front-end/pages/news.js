import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import NewsListLayout from '@/layouts/NewsListLayout'
import { PageSEO } from '@/components/SEO'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

export const POSTS_PER_PAGE = 20

const News = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  })
  const [initialDisplayPosts, setInitialDisplayPosts] = useState([])

  const fetchNews = async () => {
    try {
      const response = await defaultHttp.get(processDataRoutes.news);
      console.log(response.data.response)
      // 確保每個 news 都有唯一的 `id`
      const newsWithId = response.data.response.map((news, index) => ({
        ...news,
        uniqueId: `${news.id}-${index}`, // 生成唯一鍵
      }))

      setPosts(newsWithId)
      setInitialDisplayPosts(newsWithId.slice(0, POSTS_PER_PAGE))
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(newsWithId.length / POSTS_PER_PAGE),
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
    fetchNews()
  }, [])

  if (error) {
    return <div>載入失敗: {error}</div>
  }

  return (
    <>
      <PageSEO title={`News - ${siteMetadata.author}`} description={siteMetadata.description} />
      <NewsListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="News"
      />
    </>
  )
}

export default News
