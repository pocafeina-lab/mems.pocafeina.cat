/* eslint-disable jsx-a11y/heading-has-content */
import type { MDXComponents } from 'mdx/types'
import { css } from '@styled-system/css'

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => {
      return (
        <h1
          className={css({
            fontSize: 'xx-large',
            lineHeight: '1.15',
            marginBottom: '6'
          })}
          {...props}
        />
      )
    },
    h2: (props) => {
      return (
        <h2
          className={css({
            fontSize: 'x-large',
            lineHeight: '1.25',
            marginTop: '10',
            marginBottom: '3'
          })}
          {...props}
        />
      )
    },
    p: (props) => {
      return (
        <p
          className={css({
            maxWidth: '48rem',
            marginBottom: '5',
            lineHeight: '1.7'
          })}
          {...props}
        />
      )
    },
    a: (props) => {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a style={{ color: '#3f9d68' }} {...props} />
    },
    ...components
  }
  // Allows customizing built-in components, e.g. to add styling.
  // Return {
  //   H1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
  //   ...components,
  // }
}
