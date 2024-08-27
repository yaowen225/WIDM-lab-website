// pages/activates.js
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Activate from '@/components/Activate'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

export default function ActivatePage({ activates }) {
  return (
    <>
      <PageSEO
        title={`Activates - ${siteMetadata.author}`}
        description="A collection of activities."
      />
      <div className="mx-auto max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Activates
          </h1>
        </div>
        {activates.map((activate) => (
          <Activate key={activate.id} {...activate} />
        ))}
      </div>
    </>
  )
}

// 使用 getStaticProps 在構建時獲取資料
export async function getStaticProps() {
  try {
    const response = await defaultHttp.get(processDataRoutes.activity);
    const activates = response.data.response;

    return {
      props: {
        activates,
      },
    }
  } catch (error) {
    console.error('API 調用失敗:', error.message);
    return {
      props: {
        activates: [],
      },
    }
  }
}
