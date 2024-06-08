import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NewsApi } from '../../domain/api-client/src'
import ReactMarkdown from 'react-markdown'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

const NewsDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [news, setNews] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const apiClient = new NewsApi()
        const data = await apiClient.newsNewsIdGet(id)
        console.log(id)
        console.log(data)
        setNews(data)
      } catch (error) {
        console.error('API 調用失敗:', error.message)
        if (error.response) {
          console.error('API Response Error:', error.response.body)
        }
        setError(error.message)
      }
    }

    if (id) {
      fetchNewsDetail()
    }
  }, [id])

  if (error) {
    return <div>載入失敗: {error}</div>
  }

  if (!news) {
    return <div>載入中...</div>
  }

  return (
    <>
      <PageSEO title={`News - ${siteMetadata.author}`} description={siteMetadata.description} />
      <article>
        <h1 className="text-3xl font-bold">{news.news_title}</h1>
        <div className="mt-4">
          <ReactMarkdown>{news.news_content}</ReactMarkdown>
        </div>
      </article>
    </>
  )
}

export default NewsDetail
