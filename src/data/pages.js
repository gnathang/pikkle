// this file contains a set of GraphQL queries that are used to fetch data from a WordPress backend using the GraphQL API.
// these queries use the Apollo Client's gql function to define the structure of the queries

import { gql } from '@apollo/client';

// Define the PAGE_FIELDS fragment to include the fields you need, including flexible content fields. we use the graphQL query
// we have added our flexible content field here too,
// unfortunately.we have to copy all the field names in as we create them.
// maybe we can change this further down the line.
export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    children {
      edges {
        node {
          id
          slug
          uri
          ... on Page {
            id
            title
          }
        }
      }
    }
    id
    menuOrder
    parent {
      node {
        id
        slug
        uri
        ... on Page {
          title
        }
      }
    }
    slug
    title
    uri
  }
`;

export const QUERY_ALL_PAGES_INDEX = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES_ARCHIVE = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

// nb if you get the error code 'cannot query field "[]"
// then it is becuause that field doesn't exist - or likely you've got the structure tree wrong'

export const QUERY_PAGE_BY_URI = gql`
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      children {
        edges {
          node {
            id
            slug
            uri
            ... on Page {
              id
              title
            }
          }
        }
      }
      content
      featuredImage {
        node {
          altText
          caption
          id
          sizes
          sourceUrl
          srcSet
          mediaDetails {
            width
            height
          }
        }
      }
      id
      menuOrder
      parent {
        node {
          id
          slug
          uri
          ... on Page {
            title
          }
        }
      }
      slug
      title
      uri
      header {
        backgroundColour
        bigTitleBottom
        bigTitleTop
        fieldGroupName
        headerStyle
        smallTitle
        linkyBoy
      }
      flex {
        fieldGroupName
        flex {
          ... on FlexFlexHeroLayout {
            bigTitle
            fieldGroupName
            heroImage {
              cursor
              node {
                altText
                sourceUrl(size: BANNER)
                srcSet(size: BANNER)
                uri
              }
            }
            heroVideo {
              cursor
              node {
                altText
                uri
                srcSet(size: BANNER)
                sourceUrl(size: BANNER)
                sizes(size: BANNER)
              }
            }
            smallTitle
            textBody
          }
          ... on FlexFlexImageLayout {
            fieldGroupName
            image {
              cursor
              node {
                altText
                sizes(size: BANNER)
                sourceUrl(size: BANNER)
                srcSet(size: BANNER)
                title(format: RAW)
                uri
              }
            }
          }
          ... on FlexFlexPostAggregatorLayout {
            bigTitle
            fieldGroupName
            howManyPosts
            latestOrSelected
            layout
            link {
              target
              title
              url
            }
            numberOfColumns
            selectPostType
            smallTitle
            selectedPosts {
              fieldGroupName
              post {
                nodes {
                  uri
                }
                edges {
                  cursor
                  node {
                    uri
                  }
                }
              }
            }
          }
          ... on FlexFlexStickyCardsLayout {
            fieldGroupName
            textBody
            backgroundColour
            title
            cards {
              backgroundColour
              cardIcon {
                cursor
                node {
                  altText
                  sourceUrl(size: BANNER)
                  srcSet(size: BANNER)
                  uri
                }
              }
              fieldGroupName
              slides {
                fieldGroupName
                slideBodyText
                slideTitle
              }
              title
            }
          }
          ... on FlexFlexTextSlidesLayout {
            fieldGroupName
            layout
            thisIsALink {
              target
              url
              title
            }
            slides {
              bigTitle
              smallTitle
              textBody
              video {
                cursor
                node {
                  sourceUrl(size: BANNER)
                  srcSet(size: BANNER)
                  uri
                  sizes(size: BANNER)
                }
              }
              image {
                cursor
                node {
                  altText
                  sizes(size: BANNER)
                  sourceUrl(size: BANNER)
                  srcSet(size: BANNER)
                  uri
                }
              }
            }
          }
          ... on FlexFlexAutoscrollerLayout {
            fieldGroupName
            rows {
              background
              fieldGroupName
              scrollItem {
                colour
                fieldGroupName
                image {
                  cursor
                  node {
                    altText
                    sizes(size: BANNER)
                    sourceUrl(size: BANNER)
                    slug
                    srcSet(size: BANNER)
                    uri
                  }
                }
                text
                type
              }
            }
          }
          ... on FlexFlexWayfinderLayout {
            fieldGroupName
            introText
            layout
            smallTitle
            title
            link {
              target
              title
              url
            }
            signposts {
              fieldGroupName
              pagePost {
                edges {
                  cursor
                }
                nodes {
                  ... on Post {
                    id
                    featuredImage {
                      cursor
                      node {
                        altText
                        srcSet(size: BANNER)
                        sourceUrl(size: BANNER)
                      }
                    }
                    title(format: RAW)
                    postId
                    link
                  }
                  slug
                  uri
                  ... on Page {
                    featuredImage {
                      cursor
                      node {
                        altText
                        sourceUrl(size: BANNER)
                        srcSet(size: BANNER)
                        uri
                      }
                    }
                    content(format: RAW)
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PAGE_SEO_BY_URI = gql`
  query PageSEOByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;
