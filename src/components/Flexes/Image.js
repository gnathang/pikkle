import React from 'react';
import Container from 'components/Container';
import Section from 'components/Section';
import '@splidejs/react-splide/css';
import styles from './Image.module.scss';

const Video = ({ data }) => {
  // destructure our fields from the data object
  const { image } = data;

  return (
    <Section className={styles.image}>
      <img src={image.node.sourceUrl} />
    </Section>
  );
};

export default Video;
