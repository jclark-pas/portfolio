import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function MyStoryPage() {
  return (
    <>
      <Navigation />

      <section className={styles.section}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            About Me<span className={styles.eyebrowDot}>.</span>
          </p>
          <h1 className={styles.headline}>
            Pull up a chair and
            <br />
            I’ll tell you a tale...
          </h1>
        </header>

        <div className={styles.imageRow}>
          <div className={styles.imagePlaceholder} aria-hidden="true" />
          <div className={styles.imagePlaceholder} aria-hidden="true" />
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        </div>

        <div className={styles.prose}>
          <p>
            My name is Josh Clark, and I’m applying for the Staff Product
            Designer position at AudioEye.
          </p>
          <p>
            In 2017 I felt like I needed clarity in my vocational life, and
            spent the better part of that year writing my vocational credo — a
            rule to live my professional life by. Here it is:
          </p>
          <p className={styles.credo}>
            I design environments of access, so the excluded can be included
            and all may benefit from their inclusion.
          </p>
          <p>
            Just a year after discerning that, I experienced a spinal cord
            injury that left me living in a constructed environment full of
            barriers for people with disabilities. This life experience has
            allowed me to see the constructed world through different eyes,
            learning to understand the edges of inclusion and access all around
            me.
          </p>
          <p>
            As a trained and experienced product designer, I have spent my
            career working to enable access for people into spaces that exclude
            them. Most recently, I’ve spent my time building software to help
            passionate people with business ideas but no business background
            execute their entrepreneurial dreams. My career and skill set is
            wide ranging — from Design Director, Product Manager, Usability
            researcher, and Front-End developer.
          </p>
          <p>
            Given my vocational credo, life experience, and professional
            training, I think I’d be a good fit for AudioEye’s Staff Product
            Designer Role.
          </p>
          <p>I look forward to hearing more about the opportunity!</p>
        </div>

        <div className={styles.wideImage} aria-hidden="true" />

        <div className={styles.signature} aria-hidden="true" />
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
