import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'
import { IoMdReturnLeft } from "react-icons/io"

const ProjectTask = () => {
  const router = useRouter()
  const { id, project_id} = router.query;
  const [projectTasks, setProjectTasks] = useState(null)
  const [error, setError] = useState(null)

  const fetchProjectTask = async () => {
    try {
      const response = await defaultHttp.get(`${processDataRoutes.project}/${id}/task/${project_id}`);
      setProjectTasks(response.data.response)
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
      <article>
        <div className="flex items-center justify-between">
          <div style={{ flex: 1, textAlign: 'center' }}> {/* 讓 h1 標籤居中 */}
            <h1 
              style={{overflowWrap: 'anywhere'}}
              className="text-5xl font-extrabold text-gray-800/80 drop-shadow-lg text-wrap dark:text-white"> {projectTasks.title}  </h1>
          </div>
          <button onClick={() => router.back()} className="p-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100">
            <IoMdReturnLeft size={24} />
          </button>
        </div>
        <hr className="my-4 border-gray-300" />
        {/* <div className="mx-auto w-full max-w-4xl">
          <ReactMarkdown components={markdownComponents}>{projectTasks.content}</ReactMarkdown>
        </div> */}
        <div className="mx-auto w-full max-w-4xl" dangerouslySetInnerHTML={{ __html: projectTasks.content }} />

      </article>
    </>
  )
}

export default ProjectTask
