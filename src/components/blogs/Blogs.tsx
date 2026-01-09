'use client';

import Link from 'next/link';
import styles from './Blog.module.css';
import { blogsData } from '../common/blogsData';

const Blogs = () => {
     // Use the first blog as featured, and the rest as the grid
     const featured = blogsData[0];
     const otherBlogs = blogsData.slice(1);

     return (
          <section className={styles.blog}>

               <div className={styles.blogContainer}>
                    {/* Heading */}
                    <div className="heading-design">
                         <h1 className={styles.blogHeading}>Our Blogs</h1>
                         <p>Insights and updates from the world of logistics</p>
                    </div>

                    {/* Featured Blog */}
                    {featured && (
                         <div className={styles.featuredBlog}>
                              <div className={styles.featuredContent}>
                                   <span className={styles.date}>{featured.date}</span>
                                   <h2>{featured.title}</h2>
                                   <p>{featured.description}</p>
                                   <Link href={`/blogs/${featured.slug}`} className="my-btn btn-primary">Read More</Link>
                              </div>

                              <div className={styles.featuredImage}>
                                   <img src={featured.image} alt={featured.title} />
                              </div>
                         </div>
                    )}

                    {/* All Posts Grid */}
                    <div className={styles.latestWrapper}>
                         <h3 className={styles.latestTitle}>Latest Posts</h3>
                         <div className={styles.latestGrid}>
                              {otherBlogs.map((post) => (
                                   <div key={post.id} className={styles.blogCard}>
                                        <div className={styles.cardImageWrapper}>
                                             <img src={post.image} alt={post.title} />
                                             <span className={styles.cardCategory}>{post.category}</span>
                                        </div>
                                        <Link href={`/blogs/${post.slug}`} className={styles.cardContent}>
                                             <span className={styles.cardDate}>{post.date}</span>
                                             <h4>{post.title}</h4>
                                             <p className={styles.cardExcerpt}>{post.description.substring(0, 100)}...</p>
                                             <span className={styles.readMoreLink}>
                                                  Read Article &#8702;
                                             </span>
                                        </Link>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Blogs;
