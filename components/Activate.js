import Image from './Image'
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
}) {

  return (
    <div className=" my-3 w-full max-w-3xl rounded-md border border-gray-100 bg-white px-4 py-4 shadow-sm shadow-gray-300 dark:border-zinc-900 dark:bg-zinc-900 dark:shadow-none">
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
      <div className="mt-4 mb-1 whitespace-pre-wrap leading-normal  !text-gray-700 dark:!text-gray-200">
        {activity_sub_title}
      </div>
      {/* {media && media.length ? (
        <div
          className={
            media.length === 1
              ? 'my-2 inline-grid grid-cols-1 gap-x-2 gap-y-2'
              : 'my-2 inline-grid grid-cols-2 gap-x-2 gap-y-2'
          }
        >
          {media.map((m) => (
            <Image
              key={m.media_key}
              alt={text}
              height={m.height}
              width={m.width}
              src={m.url}
              className="rounded"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
            />
          ))}
        </div>
      ) : null} */}
      {/* {quoteTweet ? <Tweet {...quoteTweet} /> : null} */}
      {/* <a
        className="text-sm !text-gray-500 hover:!underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <time title={`Time Posted: ${createdAt.toUTCString()}`} dateTime={createdAt.toISOString()}>
          {format(createdAt, 'h:mm a - MMM d, y')}
        </time>
      </a> */}
    </div>
  )
}
