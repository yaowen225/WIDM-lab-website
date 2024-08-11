import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import ProjectCard from '@/components/ProjectCard'
import { PageSEO } from '@/components/SEO'
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'
  
export const projects = () => {
  const [projectsDatas, setProjectsData] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await defaultHttp.get(processDataRoutes.project);
      setProjectsData(response.data.response);
    } catch (error) {
      console.error('API 調用失敗:', error.message);
      if (error.response) {
        console.error('API Response Error:', error.response.body);
      }
    }
  }

  useEffect(() => {
    fetchProjects();
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
                project_id={d.id}
                title={d.project_name}
                description={d.project_description}
                github={d.project_github}
                tags={d.project_tags}
                icon={d.project_icon}
                project_link={d.project_link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default projects
