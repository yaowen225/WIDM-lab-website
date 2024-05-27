import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import ProjectCard from '@/components/ProjectCard'
import { PageSEO } from '@/components/SEO'
import { ProjectApi } from 'domain/api-client/src'
  
export const projects = () => {

  const [projectsDatas, setProjectsData] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const apiClient = new ProjectApi()
      try {
        const data = await apiClient.projectGet()

        setProjectsData(data.response)
        console.log(data.response)
      } catch (error) {
        console.error('API 調用失敗:', error.message)
        if (error.response) {
          console.error('API Response Error:', error.response.body)
        }
      }
    }

    fetchProjects()
  }, [])

  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description="A list of projects I have built"
      />
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsDatas.map((d) => (
              <ProjectCard
                key={d.id}
                title={d.project_name}
                description={d.project_description}
                github={d.project_github}
                tags={d.project_tags}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default projects
