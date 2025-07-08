import Link from 'next/link';
import Image from 'next/image';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import NavListItem from 'components/NavListItem';
import Section from 'components/Section';
import Container from 'components/Container';

// import the thing that lets you select a menu
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import styles from './Footer.module.scss';

import FooterLogo from 'public/assets/pikkle-logo-footer';
import TikTokIcon from 'public/assets/tiktok-icon.svg';
import InstagramIcon from 'public/assets/instagram-icon.svg';

const Footer = () => {
  const { metadata = {}, menus, recentPosts = [], categories = [] } = useSite();
  const { title } = metadata;

  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories = Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  const navigationLocation = 'MAIN';

  // we grab it here
  const navigation = findMenuByLocation(menus, navigationLocation);

  return (
    <footer className={styles.footer}>
      {hasMenu && (
        <Section>
          <Container>
            <div className={styles.footerInner}>
              <FooterLogo />

              <div className={styles.footerMenu}>
                <ul>
                  {navigation?.map((listItem) => {
                    return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
                  })}
                </ul>

                {/* todo: transfer into button */}
                <a className={styles.buildYourBrief} href="/build-your-brief" aria-label="build your brief link">
                  Build your brief
                </a>

                <div className={styles.social_links}>
                  <Link className={styles.social_link} href="">
                    <TikTokIcon width="30" height="30" />
                  </Link>
                  <Link className={styles.social_link} href="">
                    <InstagramIcon width="30" height="30" />
                  </Link>
                </div>

                <div className={styles.footerLegal}>
                  <p>
                    &copy; {new Date().getFullYear()} {title}
                  </p>
                  <p>designed by designdough</p>
                  <p>Privacy</p>
                  <p>Cookies</p>
                </div>
              </div>
              {/* we're not using these. they pull in recent posts and categories etc. */}
              {/*               
              <ul className={styles.footerMenuColumns}>
                {hasRecentPosts && (
                  <li>
                    <Link className={styles.footerMenuTitle} href="/posts/">
                      <strong>Recent Posts</strong>
                    </Link>
                    <ul className={styles.footerMenuItems}>
                      {recentPosts.map((post) => {
                        const { id, slug, title } = post;
                        return (
                          <li key={id}>
                            <Link href={postPathBySlug(slug)}>{title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                )}

                {hasRecentCategories && (
                  <li>
                    <Link href="/categories/" className={styles.footerMenuTitle}>
                      <strong>Categories</strong>
                    </Link>
                    <ul className={styles.footerMenuItems}>
                      {categories.map((category) => {
                        const { id, slug, name } = category;
                        return (
                          <li key={id}>
                            <Link href={categoryPathBySlug(slug)}>{name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                )}

                <li>
                  <p className={styles.footerMenuTitle}>
                    <strong>More</strong>
                  </p>
                  <ul className={styles.footerMenuItems}>
                    <li>
                      <a href="/feed.xml">RSS</a>
                    </li>
                    <li>
                      <a href="/sitemap.xml">Sitemap</a>
                    </li>
                  </ul>
                </li>
              </ul> */}
            </div>
          </Container>
        </Section>
      )}
    </footer>
  );
};

export default Footer;
