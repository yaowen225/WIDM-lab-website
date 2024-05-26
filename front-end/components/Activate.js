import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Image from 'next/image'
import { format } from 'date-fns'

/**
 * Supports plain text, images, quote tweets.
 *
 * Needs support for images, GIFs, and replies maybe?
 * Styles use !important to override Tailwind .prose inside MDX.
 */
export default function Tweet({
  id,
  activity_title,
  activity_sub_title,
  created_at,
  activity_image,
}) {
  return (
    <div className="my-3 w-full max-w-3xl rounded-md border border-gray-100 bg-white px-4 py-4 shadow-sm shadow-gray-300 dark:border-zinc-900 dark:bg-zinc-900 dark:shadow-none">
      <div className="flex items-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="flex items-center font-bold leading-5 !text-gray-900 dark:!text-gray-100"
            title={activity_title}
          >
            {activity_title}
          </span>
        </a>
      </div>
      <div className="mt-4 mb-1 whitespace-pre-wrap leading-normal !text-gray-700 dark:!text-gray-200">
        {activity_sub_title}
      </div>
      {activity_image && activity_image.length ? (
        <div className="my-2">
          <Slide>
            {activity_image.map((image) => (
              <div className="each-slide" key={image}>
                <Image
                  alt={activity_title}
                  src={`https://widm-back-end.nevercareu.space/activity/${id}/activity-image/${image}`}
                  width={600}  // 根據實際圖片大小調整寬度
                  height={400} // 根據實際圖片大小調整高度
                  className="rounded"
                />
              </div>
            ))}
          </Slide>
        </div>
      ) : null}
      <a
        className="text-sm !text-gray-500 hover:!underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <time title={`Time Posted: ${new Date(created_at).toUTCString()}`} dateTime={new Date(created_at).toISOString()}>
          {format(new Date(created_at), 'h:mm a - MMM d, y')}
        </time> */}
      </a>
    </div>
  )
}
