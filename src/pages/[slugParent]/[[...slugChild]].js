import Link from 'next/link';
import { Helmet } from 'react-helmet';
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from 'styles/pages/Page.module.scss';

// Import your flex components
import PageHeader from 'components/flexes/PageHeader';
// .. add more

// make an object where each key represents the name of a flexible content layout type.
const flexComponents = {
  FlexFlexPageHeaderLayout: PageHeader,
  // Add other flex components here
};

export default function Page({ page, breadcrumbs }) {
  // we destructure off the page object
  // we've passed the flex array from from the GraphQL query response
  // the flex array contains the flexible content sections, on the page in question - each identified by its __typename.
  const { title, metaTitle, description, slug, content, featuredImage, children, flex } = page;

  console.log(title);
  console.log(flex);

  const { metadata: siteMetadata = {} } = useSite();
  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const hasChildren = Array.isArray(children) && children.length > 0;
  const hasBreadcrumbs = Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings}>
        {/* need to add this link tag into the helmet, which we import from next. */}
        <link rel="stylesheet" href="https://use.typekit.net/qef1kdc.css" />
      </Helmet>

      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      <Header data={page}>
        {hasBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.caption}
          />
        )}
        <h1 className={styles.title}>{title}</h1>
      </Header>

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>

        {flex &&
          flex.map((flexItem, index) => {
            const FlexComponent = flexComponents[flexItem.__typename];
            return (
              <Section className="flex" key={index}>
                <Container>
                  {FlexComponent ? (
                    // we're passing the flexComponent the data prop 'flexItem' here
                    <FlexComponent data={flexItem} />
                  ) : (
                    <div>Component not found for {flexItem.__typename}</div>
                  )}
                </Container>
              </Section>
            );
          })}

        {hasChildren && (
          <Section className={styles.sectionChildren}>
            <Container>
              <aside>
                <p className={styles.childrenHeader}>
                  <strong>{title}</strong>
                </p>
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.id}>
                        <Link href={child.uri}>{child.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Container>
          </Section>
        )}
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { slugParent, slugChild } = params;
  let pageUri = `/${slugParent}/`;

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);

  return {
    props: {
      page,
      breadcrumbs,
    },
  };
}

export async function getStaticPaths() {
  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  const paths = pages
    .filter(({ uri }) => typeof uri === 'string' && uri !== '/')
    .map(({ uri }) => {
      const segments = uri.split('/').filter((seg) => seg !== '');

      return {
        params: {
          slugParent: segments.shift(),
          slugChild: segments,
        },
      };
    });

  return {
    paths,
    fallback: 'blocking',
  };
}
