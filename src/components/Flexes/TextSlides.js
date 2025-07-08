import React from 'react';
import Container from 'components/Container';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';
import '@splidejs/react-splide/css';
import styles from './TextSlides.module.scss';
import Section from 'components/Section';

import BlueJar from 'public/assets/blue-jar';
import TealJar from 'public/assets/teal-jar';

const TextSlides = ({ data }) => {
  const { slides, thisIsALink } = data;

  return (
    <Section className={styles.text_slides}>
      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          perScroll: 1,
          width: '100%',
          gap: '1rem',
        }}
      >
        {slides.map((slide, index) => (
          <SplideSlide key={index}>
            {console.log('link data:', data)}
            <a href={thisIsALink.target}>{thisIsALink.title}</a>
            <Container>
              <div className={styles.text_slide}>
                <BlueJar className={styles.blue_jar} />
                <div>
                  <h6>{slide.smallTitle}</h6>
                  <h2>{slide.bigTitle}</h2>
                  <h4>{slide.textBody}</h4>
                  <p>{slide.textyBoy}</p>
                  {slide.slideLink && <a href={slide.slideLink.url}>{slide.slideLink.title}</a>}
                </div>
                <TealJar className={styles.teal_jar} />
                {/* You can access other fields here like slide.link, slide.image */}
              </div>
            </Container>
          </SplideSlide>
        ))}
      </Splide>
    </Section>
  );
};

export default TextSlides;
