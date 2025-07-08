import React from 'react';
import Container from 'components/Container';
import Section from 'components/Section';
import '@splidejs/react-splide/css';
import styles from './Video.module.scss';

const Video = ({ data }) => {
  // destructure our fields from the data object
  const { nativeOrIframe, videoId, fileUploadVideo } = data;
  return (
    <Section className={styles.video}>
      {nativeOrIframe ? (
        <video src={fileUploadVideo} title="video" />
      ) : (
        <iframe
          id="projectplayer"
          src={`https://player.vimeo.com/video/${videoId}?api=1&muted=0`}
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          allow="fullscreen; picture-in-picture"
          title="video"
        />
      )}
    </Section>
  );
};

export default Video;
