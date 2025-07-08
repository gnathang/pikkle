import React from 'react';
import Container from 'components/Container';
import styles from './Header.module.scss';
import classNames from 'classnames';

import DownArrowPink from 'public/assets/down-arrow-pink';

const Header = ({ children, data }) => {
  // Destructure the header data object
  const { backgroundColour, bigTitleTop, bigTitleBottom, headerStyle, smallTitle, linkyBoy } = data;

  // Define dynamic styles
  // Construct dynamic class names
  console.log('header data:', data);
  console.log('header link:', linkyBoy);
  const headerClasses = classNames(
    styles.header,
    styles[headerStyle], // Apply header style dynamically if it exists
    styles[backgroundColour] // Apply background color dynamically if it exists
  );

  return (
    <header className={headerClasses}>
      <Container>
        {/* {children} */}
        {styles[headerStyle] !== 'home' && smallTitle && <h6 className={styles.smallTitle}>{smallTitle}</h6>}
        <div className={styles.title_wrap}>
          <div className="title">
            {bigTitleTop && <h1 className={styles.bigTitleBottom}>{bigTitleTop}</h1>}
            {bigTitleBottom && <h2 className={styles.bigTitleBottom}>{bigTitleBottom}</h2>}
            <p>{linkyBoy}</p>
          </div>
          <DownArrowPink />
        </div>
      </Container>
    </header>
  );
};

export default Header;
