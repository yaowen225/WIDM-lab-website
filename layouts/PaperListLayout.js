import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { FaFileDownload } from 'react-icons/fa'
import { PaperAttachmentApi } from 'api-client/src'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [error, setError] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.paper_title + frontMatter.paper_authors + frontMatter.paper_tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const download_attachment = async (id, attachment) => {
    const download_url = `https://widm-back-end.nevercareu.space/paper/${id}/paper-attachment/${attachment}`
    try {
      const apiClient = new PaperAttachmentApi()
      await apiClient.paperPaperIdPaperAttachmentPaperAttachmentUuidGetWithHttpInfo(id, attachment)
      window.location.href = download_url
      toast.success('Download!', { progressBar: false })
    } catch (error) {
      toast.error('Download Error!', { progressBar: false })
      console.error('Download Error:', error.message)
      if (error.response) {
        console.error('API Response Error:', error.response.body)
      }
      setError(error.message)
    }
  }

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const {
              id,
              uniqueId,
              create_time,
              paper_attachment,
              paper_authors,
              paper_link,
              paper_origin,
              paper_publish_year,
              paper_tags,
              paper_title,
              update_time,
            } = frontMatter

            return (
              <li
                key={`li-paper-${id}-${uniqueId}`}
                className="py-6 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <article className="space-y-2 bg-transparent bg-opacity-20 p-2 transition duration-200 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 xl:grid xl:grid-cols-2 xl:items-baseline xl:space-y-3">
                  <dl>
                    <dd className="text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">
                      <a>Publish Year {paper_publish_year}</a>
                      {' • － '}
                      <time dateTime={update_time}>Update by {formatDate(update_time)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-4">
                    <div className="space-y-1">
                      <div>
                        <Link
                          href={`${paper_link}`}
                          className="group flex bg-transparent bg-opacity-20 px-2 "
                        >
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <span className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500">
                              {paper_title}
                            </span>
                          </h2>
                        </Link>
                      </div>
                      <div className="flex flex-wrap">
                        {paper_tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <div>{paper_origin}</div>
                      <div className="prose flex max-w-none justify-between pt-5 text-gray-500 dark:text-gray-400">
                        <p>Author: {paper_authors}</p>
                        <FaFileDownload
                          className="cursor-pointer text-4xl"
                          onClick={() => download_attachment(id, paper_attachment)}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      <ToastContainer />
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
