'use client';
import { useEffect, useState } from 'react';
import styles from './BlogDetails.module.css';
import { BlogPost, blogsData } from '../common/blogsData';
import Link from 'next/link';

interface BlogPageProps {
  blog: BlogPost;
}

const BlogPage = ({ blog }: BlogPageProps) => {
  const [activeId, setActiveId] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // or 'smooth' if you prefer
    });
  }, [blog.slug]); // runs when route/blog changes

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    blog.content.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [blog.content]);

  // Get current page URL
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // Share handlers
  const handleFacebookShare = () => {
    const url = getCurrentUrl();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
    );
  };

  const handleLinkedInShare = () => {
    const url = getCurrentUrl();
    const title = encodeURIComponent(blog.title);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
    );
  };

  const handleCopyLink = async () => {
    const url = getCurrentUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        alert('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  // Related blogs (same category, excluding current blog)
  const relatedBlogs = blogsData
    .filter(
      (item) =>
        item.id !== blog.id && item.category === blog.category
    )
    .slice(0, 3);

  // Fallback if same-category blogs are less
  const fallbackBlogs =
    relatedBlogs.length < 3
      ? [
        ...relatedBlogs,
        ...blogsData
          .filter((item) => item.id !== blog.id)
          .slice(0, 3 - relatedBlogs.length),
      ]
      : relatedBlogs;


  return (
    <article className={styles.detailPage}>
      {/* Header Section */}
      <header className={styles.blogHeader}>
        <div className={styles.container}>
          <div className={styles.topMeta}>
            <div className={styles.breadcrumb}>
              <Link href="/blogs">&#8701; Back to Blogs</Link>
            </div>
            <span className={styles.categoryTag}>{blog.category}</span>
          </div>
          <div className={styles.meta}>
            <span>By {blog.author}</span> •{' '}
            <span>{blog.date}</span>
          </div>
        </div>
      </header>

      <div className={`${styles.container} ${styles.mainGrid}`}>
        {/* Social Share Sidebar */}
        <aside className={styles.shareSidebar}>
          <div className={styles.stickySide}>
            <p>SHARE</p>
            <button
              title="Share on Facebook"
              className={styles.shareBtn}
              onClick={handleFacebookShare}
              aria-label="Share on Facebook"
            >
              <img src="/images/facebook.svg" alt="facebook" />
            </button>
            <button
              title="Share on LinkedIn"
              className={styles.shareBtn}
              onClick={handleLinkedInShare}
              aria-label="Share on LinkedIn"
            >
              <img src="/images/linkedin.svg" alt="linkedin" />
            </button>
            <button
              title={copySuccess ? 'Link Copied!' : 'Copy Link'}
              className={styles.shareBtn}
              onClick={handleCopyLink}
              aria-label="Copy link to clipboard"
            >
              <img src="/images/share.svg" alt="share" />
            </button>
            {copySuccess && (
              <span className={styles.copyFeedback}>Copied!</span>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className={styles.contentArea}>
          <h1>{blog.title}</h1>
          <img src={blog.image} alt={blog.title} className={styles.mainImg} />
          <div className={styles.bodyText}>
            <p className={styles.lead}>{blog.description}</p>
            {blog.content.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={styles.section}
              >
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        </div>

        {/* ScrollSpy Table of Contents */}
        <aside className={styles.tocSidebar}>
          <div className={styles.stickySide}>
            <h4>On This Page</h4>
            <ul>
              {blog.content.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={activeId === section.id ? styles.activeLink : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {/* You May Also Like */}
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <h3 className={styles.relatedHeading}>You May Also Like</h3>

          <div className={styles.relatedGrid}>
            {fallbackBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImage}>
                  <img src={post.image} alt={post.title} />
                  <span className={styles.relatedCategory}>
                    {post.category}
                  </span>
                </div>

                <div className={styles.relatedContent}>
                  <span className={styles.relatedDate}>{post.date}</span>
                  <h4>{post.title}</h4>
                  <p>
                    {post.description.substring(0, 90)}...
                  </p>
                  <span className={styles.readMore}>
                    Read More &#8702;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogPage;