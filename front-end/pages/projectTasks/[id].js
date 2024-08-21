import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'
import { IoMdReturnLeft } from "react-icons/io"

import ProjectTimeline from '@/components/ProjectTimeline'
import { motion } from 'framer-motion'

const ProjectTask = () => {
  const router = useRouter()
  const { id, title, description } = router.query;
  const [projectTasks, setProjectTasks] = useState(null);
  const [error, setError] = useState(null);

  const fetchProjectTask = async () => { 
    try { 
      const response = await defaultHttp.get(`${processDataRoutes.project}/${id}/task`);
      setProjectTasks(response.data.response);
    } catch (error) {
      console.error('API 調用失敗:', error.message);
      if (error.response) {
        console.error('API Response Error:', error.response.body);
      }
      setError(error.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProjectTask();
    };
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Projects
            </h1>
            <button onClick={() => router.back()} className="p-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100">
              <IoMdReturnLeft size={24} />
            </button>
          </div>
          
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
          <ProjectTimeline items={projectTasks} />
        </motion.div>
      </div>
    </>
  )
}

export default ProjectTask
