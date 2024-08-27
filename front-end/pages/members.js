import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import { Icon } from '@iconify/react';
import { defaultHttp } from 'utils/http'
import { processDataRoutes } from 'routes/api'

export const Members = ({ members }) => {
  const groupByPosition = members.reduce((acc, member) => {
    if (!acc[member.position]) {
      acc[member.position] = []
    }
    acc[member.position].push(member)
    return acc
  }, {})

  return (
    <>
      <PageSEO title={`Members - ${siteMetadata.author}`} description="What I use" />
      <div className="mx-auto max-w-4xl divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Members
          </h1>
        </div>
        
        <div className="container py-12">
          {Object.keys(groupByPosition).map((character, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{character}</h2>
              <div className="flex flex-row flex-wrap">
                {groupByPosition[character].map((d, idx) => (
                  <Link
                    key={idx}
                    className="group mb-4 w-full cursor-pointer rounded-xl p-6 backdrop-filter transition duration-100 hover:scale-[1.02] hover:bg-gray-300 hover:bg-opacity-40 dark:hover:bg-gray-500 dark:hover:bg-opacity-40 md:w-1/2"
                  >
                    <div className="flex items-center justify-start">
                      <div className="flex-shrink-0 p-3 font-sans text-gray-700 dark:text-gray-50 ">
                        {d.image_existed ? (
                          <img
                            src={`https://widm-back-end.nevercareu.space/member/${d.id}/member-image`}
                            alt="Member Icon"
                            className="h-28 w-28 rounded-md"
                          />
                        ) : (
                          <Icon icon="charm:person" style={{ color: 'black', height: '7rem', width: '7rem' }} />
                        )}
                      </div>
                      <div className="flex flex-col p-3">
                        <p className="text-2xl truncate font-bold leading-5 text-gray-800 dark:text-white sm:text-base lg:text-2xl">
                          {d.name}
                        </p>
                        <p className=" text-gray-500 dark:text-gray-400 sm:text-base lg:text-base">
                          {d.name_en}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base lg:text-sm xl:text-base">
                          {d.intro}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// 使用 getStaticProps 在構建時獲取資料
export async function getStaticProps() {
  try {
    const response = await defaultHttp.get(processDataRoutes.member);
    const members = response.data.response;

    return {
      props: {
        members,
      },
    }
  } catch (error) {
    console.error('API 調用失敗:', error.message);
    return {
      props: {
        members: [],
      },
    }
  }
}

export default Members
