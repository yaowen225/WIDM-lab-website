import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { ProjectTaskApi } from 'domain/api-client/src'

import Timeline from '@/components/Timeline'
import { motion } from 'framer-motion'

const ProjectTask = () => {
  const router = useRouter()
  const { id, title, description } = router.query;
  const [projectTasks, setProjectTasks] = useState(null)
  const [error, setError] = useState(null) 

  useEffect(() => {
    const fetchProjectTask = async () => { 
      try { 
        const apiClient = new ProjectTaskApi()
        const data = await apiClient.projectProjectIdTaskGet(id)

        setProjectTasks(data.response)
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
      fetchProjectTask() 
    }
  }, [id])

  if (error) {
    return <div>載入失敗: {error}</div>
  }

  if (!projectTasks) {
    return <div>載入中...</div>
  }

  return (
    <>
      <PageSEO title={`Project Task - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="mx-auto max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Project Title.
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
          Project description.
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.9 }}
          variants={{
            hidden: {
              opacity: 0.5,
              y: 10,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          <Timeline items={projectTasks} />
        </motion.div>
      </div>
    </>
  )
}

export default ProjectTask
