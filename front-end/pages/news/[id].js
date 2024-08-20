import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { IoMdReturnLeft } from "react-icons/io"
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

const NewsDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [news, setNews] = useState(null)
  const [error, setError] = useState(null)

  const fetchNewsDetail = async () => {
    try {
      const response = await defaultHttp.get(`${processDataRoutes.news}/${id}`);
      setNews(response.data.response)
      console.log(response.data.response)
    } catch (error) {
      console.error('API 調用失敗:', error.message)
      if (error.response) {
        console.error('API Response Error:', error.response.body)
      }
      setError(error.message)
    }
  }

  useEffect(() => {
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
        <div className="flex items-center justify-between">
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1
              style={{ overflowWrap: 'anywhere' }}
              className="text-5xl font-extrabold text-gray-800/80 drop-shadow-lg text-wrap dark:text-white"
            >
              {news.title}
            </h1>
          </div>
          <button onClick={() => router.back()} className="p-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100">
            <IoMdReturnLeft size={24} />
          </button>
        </div>
        <hr className="my-4 border-gray-300" />
        <div
          className="mx-auto w-full max-w-4xl news-content-container"
          dangerouslySetInnerHTML={{
            __html: news.content,
          }}
        />
      </article>
    </>
  )
}

export default NewsDetail
