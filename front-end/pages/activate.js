import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Activate from '@/components/Activate'
import { Slide } from 'react-slideshow-image';
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

export const activate = () => {

  const [activates, setActivates] = useState([])

  const fetchActivates = async () => {
    try {
      const response = await defaultHttp.get(processDataRoutes.activity);
      setActivates(response.data.response)
    } catch (error) {
      console.error('API 調用失敗:', error.message)
      if (error.response) {
        console.error('API Response Error:', error.response.body)
      }
    }
  }

  useEffect(() => {
    fetchActivates()
  }, [])

  return (
    <>
      <PageSEO
        title={`Tweets - ${siteMetadata.author}`}
        description="A collection of tweets that inspire me, make me laugh, and make me think."
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

export default activate
