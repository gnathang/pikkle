import React from 'react';
import Container from 'components/Container';
import Section from 'components/Section';
import Link from 'next/link';
import styles from './Wayfinder.module.scss';

const Wayfinder = ({ data }) => {
  const { layout, smallTitle, title, introText, link, signposts } = data;

  return (
    <Section className={styles.Wayfinder}>
      <Container>
        <div className={styles.titleWrap}>
          {smallTitle && <h6>{smallTitle}</h6>}
          {title && <h2>{title}</h2>}
          {introText && <p>{introText}</p>}
          {link && (
            <Link target={link.target} href={link.url}>
              {link.title}
            </Link>
          )}
        </div>
        <div className={styles.gridWrap}>
          {signposts.map(
            (signpost, index) => (
              console.log('signpost', signpost),
              (
                <div key={index} className={styles.gridCell}>
                  {signpost.pagePost.edges.map((edge, edgeIndex) => {
                    const { node: page } = edge;
                    return (
                      <div key={edgeIndex}>
                        {page.featuredImage && (
                          <img
                            src={page.featuredImage.node.sourceUrl}
                            alt={page.featuredImage.node.altText}
                            srcSet={page.featuredImage.node.srcSet}
                          />
                        )}
                        <h3>{page.title}</h3>
                      </div>
                    );
                  })}
                </div>
              )
            )
          )}
        </div>
      </Container>
    </Section>
  );
};

export default Wayfinder;
