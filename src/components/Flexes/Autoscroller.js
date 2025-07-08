import React from 'react';
import Container from 'components/Container';
import Section from 'components/Section';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import styles from './Autoscroller.module.scss';

const Autoscroller = ({ data }) => {
  // destructure our fields from the data object
  const { rows } = data;

  console.log('Autoscroller data:', data);

  return (
    <Section className={styles.autoscroller}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          <Splide
            options={{
              type: 'loop',
              perPage: 3,
              perScroll: 1,
              width: '100%',
              gap: '1rem',
              arrows: false,
              pagination: false,
              autoScroll: {
                speed: 1, // Speed of the auto scroll in pixels per second
                pauseOnHover: false, // Pause auto scroll on hover
                pauseOnFocus: true, // Pause auto scroll on focus
              },
            }}
            extensions={{ AutoScroll }}
          >
            {row.scrollItem.map((item, scrollItemIndex) => (
              <SplideSlide key={scrollItemIndex}>
                {item.type === 'text' ? (
                  <h4>{item.text}</h4>
                ) : (
                  <img src={item.image.node.sourceUrl} alt="slide image" />
                )}
              </SplideSlide>
            ))}
          </Splide>
        </div>
      ))}
    </Section>
  );
};

export default Autoscroller;
