import siteMetadata from '@/data/siteMetadata'
import NewsListLayout from '@/layouts/NewsListLayout'
import { PageSEO } from '@/components/SEO'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

export const POSTS_PER_PAGE = 20

const News = ({ posts, initialDisplayPosts, pagination, error }) => {
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

export async function getStaticProps() {
  try {
    const response = await defaultHttp.get(processDataRoutes.news);

    // 確保每個 news 都有唯一的 `id`
    const newsWithId = response.data.response.map((news, index) => ({
      ...news,
      uniqueId: `${news.id}-${index}`, // 生成唯一鍵
    }))

    const initialDisplayPosts = newsWithId.slice(0, POSTS_PER_PAGE)
    const pagination = {
      currentPage: 1,
      totalPages: Math.ceil(newsWithId.length / POSTS_PER_PAGE),
    }

    return {
      props: {
        posts: newsWithId,
        initialDisplayPosts,
        pagination,
      },
    }
  } catch (error) {
    console.error('API 調用失敗:', error.message);

    return {
      props: {
        posts: [],
        initialDisplayPosts: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
        },
        error: error.message,
      },
    }
  }
}

export default News
