/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const isValidHref = href && href.trim() !== '';

  console.log(href, isInternalLink, isAnchorLink, isValidHref)

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  if (isValidHref){
    return (
      <a
        className="special-underline-new no-underline hover:text-gray-100 dark:hover:text-gray-100"
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    )
  }

  return (
    <a
      className="special-underline-new no-underline hover:text-gray-100 dark:hover:text-gray-100"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  )
}

export default CustomLink
