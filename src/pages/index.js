// the homepage

import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPageByUri } from 'lib/pages';
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
import TextSlides from 'components/flexes/TextSlides';
import Autoscroller from 'components/flexes/Autoscroller';
import Video from 'components/Flexes/Video';
import Image from 'components/Flexes/Image';
import Wayfinder from 'components/Flexes/Wayfinder';
// .. add more

// make an object where each key represents the name of a flexible content layout type.
const flexComponents = {
  FlexFlexPageHeaderLayout: PageHeader,
  FlexFlexTextSlidesLayout: TextSlides,
  FlexFlexAutoscrollerLayout: Autoscroller,
  FlexFlexVideoLayout: Video,
  FlexFlexImageLayout: Image,
  FlexFlexWayfinderLayout: Wayfinder,
  // Add other flex components here
};

export default function Home({ page, breadcrumbs }) {
  // destructure the necessary fields from the page object
  const { title, metaTitle, description, slug, content, featuredImage, children, flex, header } = page;

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

      {/* passing header the page data we get from lib/pages */}
      <Header data={header}>
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
        <Container>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </Container>

        {/* here we map over the flex components that are on the current page */}
        {flex &&
          flex.map((flexItem, index) => {
            const FlexComponent = flexComponents[flexItem.__typename];
            return FlexComponent ? (
              // Render the FlexComponent directly without any wrapping element
              <FlexComponent data={flexItem} key={index} />
            ) : (
              <div key={index}>Component not found for {flexItem.__typename}</div>
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

export async function getStaticProps() {
  // Fetch the necessary data for the home page
  const { page } = await getPageByUri('/'); // Assuming the home page has the slug '/'

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  // Get breadcrumbs if needed
  // const breadcrumbs = getBreadcrumbsByUri('/', pages);

  return {
    props: {
      page,
      // breadcrumbs,
    },
  };
}
