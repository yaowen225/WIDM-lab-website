import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NewsApi } from '../../domain/api-client/src'
import ReactMarkdown from 'react-markdown'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { IoMdReturnLeft } from "react-icons/io"

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
        setNews(data.response)
        console.log(data.response)
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

  const markdownComponents = {
    h1: ({node, ...props}) => <h1 className="my-4 text-4xl font-extrabold" {...props} />,
    h2: ({ node, ...props }) => <h2 className="my-4 text-3xl font-bold" {...props} />,
    h3: ({ node, ...props }) => <h3 className="my-4 text-2xl font-semibold" {...props} />,
    h4: ({ node, ...props }) => <h4 className="my-4 text-xl font-medium" {...props} />,
    p:  ({ node, ...props }) => <p className="my-2 mt-4 text-base leading-7 text-gray-700" {...props} />,
    ul: ({ node, ...props }) => <ul className="ml-5 list-disc" {...props} />,
    ol: ({ node, ...props }) => <ol className="ml-5 list-decimal" {...props} />,
    li: ({ node, ...props }) => <li className="mt-1" {...props} />,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    img: ({ node, ...props }) => (
      <img {...props} style={{ minWidth: '60%', minHeight: '50%', maxWidth: '100%', maxHeight: '100%', margin: '0 auto' }} alt={props.alt} />
    ),
  }

  return (
    <>
      <PageSEO title={`News - ${siteMetadata.author}`} description={siteMetadata.description} />
      <article>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-extrabold text-teal-600/80 drop-shadow-lg">
            {news.news_title}
          </h1>
          <button
            onClick={() => router.back()}
            className="p-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100"
          >
            <IoMdReturnLeft size={24} />
          </button>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="mt-4">
          
          <ReactMarkdown components={markdownComponents}>{news.news_content}</ReactMarkdown>
          
        </div>
        
      </article>
    </>
  )
}

export default NewsDetail
