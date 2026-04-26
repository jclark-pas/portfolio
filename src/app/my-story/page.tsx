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
            How the worst day of my life made me a better design leader.
          </h1>
        </header>

        <div className={styles.prose}>
          <p>
            Hi, I’m Josh Clark — a product designer and builder. I’ve been
            designing since 2006 and working in product design specifically
            since 2011, across mobile and web, from healthcare to small-business
            SaaS. Along the way I’ve worn most of the hats: product and project
            management, user research, UX and UI, front-end development, and
            enough back-end to be dangerous.
          </p>
          <p>
            That’s the résumé version. The story underneath it starts in 2017.
          </p>
          <p>
            After a decade in the work, I needed to know <em>why</em> I was
            doing it. So I spent the better part of that year writing a
            vocational credo — a rule to live my professional life by:
          </p>
          <aside className={styles.credoCallout}>
            <p className={styles.credoEyebrow}>My Credo</p>
            <blockquote className={styles.credo}>
              “I design environments of access, so the excluded can be
              included and all may benefit from their inclusion.”
            </blockquote>
          </aside>
          <p>A year later, that sentence stopped being abstract.</p>
          <p>
            On September 6, 2018, I woke from a dead sleep with a pain in my
            lower back. Within fifty minutes I couldn’t move from the waist
            down. Ten days later I was diagnosed with Transverse Myelitis — my
            immune system had attacked my spinal cord and left me with partial
            paralysis below the waist.
          </p>
          <p>
            It took two years of intense physical therapy, stubborn
            determination, and a lot of luck to work my way from a wheelchair
            back to walking on my own. For a long stretch I was sure the life
            I’d been building — including the path toward design leadership I
            was on — was over.
          </p>
        </div>

        <div className={styles.imageRow}>
          <div className={styles.imagePlaceholder} aria-hidden="true" />
          <div className={styles.imagePlaceholder} aria-hidden="true" />
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        </div>

        <div className={styles.prose}>
          <p>
            What I found instead was that the worst day of my life had become a
            strange kind of gift.
          </p>
          <p>
            It taught me how to dig deep, how to make the life I have rather
            than the one I’d planned, and how to keep showing up when progress
            is measured in millimeters. It also gave me the gift of perspective.
            Overnight, I went from being part of the majority to being a
            minority, navigating a world full of barriers I’d never had to
            notice. I won’t claim to understand the experience of every
            marginalized person — every story is different — but my own turned
            a long list of <em>unknown</em> unknowns about privilege into{" "}
            <em>known</em> unknowns. That shift turned my credo from a slogan
            into a practice, and made the ongoing work of learning those
            unknowns part of how I show up.
          </p>
          <p>
            And it taught me something I now carry into every team I work with:
            we are all, at our base, a collection of our worst days. They don’t
            have to ruin us — but they do define us. Mine is more dramatic than
            most, but it has made me a more empathetic collaborator and, I
            believe, a better leader. I’m slower to judge, quicker to listen,
            and genuinely interested in helping the people around me find work
            that feels meaningful — whatever hand they’ve been dealt.
          </p>
          <p>
            The way I work and lead comes from all of it: identify the
            constraints, then find the simplest path to success around or
            through them.
          </p>
          <p>
            That’s the leader I want to be, and the work I want to do next:
            building thoughtful products with sharp, talented people, designing
            environments of access, and helping a team do the best work of
            their careers.
          </p>
        </div>

        <div className={styles.wideImage} aria-hidden="true" />

        <div className={styles.signature} aria-hidden="true" />
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
