import React from 'react';
import Container from 'components/Container';
import Section from 'components/Section';

import styles from './PageHeader.module.scss';

const PageHeader = ({ data }) => {
  // destructure our fields from the data object
  const { pageHeaderImage, bigTitle, textBody, backgroundColour } = data;

  console.log('PageHeader data:', data);

  return (
    <div className={styles.section_page_header}>
      <Container>
        {pageHeaderImage && pageHeaderImage.node ? (
          <img
            srcSet={pageHeaderImage.node.srcSet}
            src={pageHeaderImage.node.mediaItemUrl}
            alt={pageHeaderImage.node.altText || 'Header Logo'}
            title={pageHeaderImage.node.title}
            sizes={pageHeaderImage.node.sizes}
          />
        ) : (
          <p>No header image available</p>
        )}
        <h1>{bigTitle}</h1>
        <p>{textBody}</p>
      </Container>
    </div>
  );
};

export default PageHeader;
