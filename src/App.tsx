import site from './data/site.json'
import projects from './data/projects.json'
import './App.css'

type Project = (typeof projects)[number]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M3 10h12M10 5l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

function PlaceholderVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.mockup}`} aria-label={site.ui.projectPlaceholderLabel} role="img">
      <span className="visual-label">{site.ui.projectPlaceholderText}</span>
      <div className="visual-window">
        <span className="visual-topline" />
        <span className="visual-side" />
        <span className="visual-primary" />
        <span className="visual-secondary" />
        <span className="visual-dot visual-dot--one" />
        <span className="visual-dot visual-dot--two" />
        <span className="visual-dot visual-dot--three" />
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.theme} project-card--${project.layout}`}>
      <div className="project-content">
        <div className="project-topline"><span>{project.number}</span><span>{project.category}</span></div>
        <PlaceholderVisual project={project} />
        <div className="project-copy">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-footer">
            <ul aria-label={`${project.title} disciplines`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <span className="project-status">{site.ui.projectStatusLabel}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label={`${site.brand.name} home`}>{site.brand.monogram}</a>
        <nav aria-label="Primary navigation">{site.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
        <a className="header-contact" href={`mailto:${site.contact.email}`}>{site.ui.headerContactLabel}</a>
      </header>

      <section className="hero-grid" id="top" aria-labelledby="hero-heading">
        <div className="hero-intro tile tile--paper">
          <p className="hero-greeting">{site.hero.intro}</p>
          <h1 id="hero-heading">{site.hero.headline}</h1>
          <p className="hero-supporting">{site.hero.supportingText}</p>
          <div className="hero-actions">
            <a className="button button--ink" href={site.hero.cta.href} target="_blank" rel="noreferrer">{site.hero.cta.label}<ArrowIcon /></a>
            <a className="text-link" href={site.hero.secondaryAction.href}>{site.hero.secondaryAction.label}<ArrowIcon /></a>
          </div>
        </div>
        <aside className="hero-stat tile tile--blue" aria-label={site.hero.stat.ariaLabel}><span className="stat-value">{site.hero.stat.value}</span><span className="stat-label">{site.hero.stat.label}</span><span className="orbit orbit--one" /><span className="orbit orbit--two" /></aside>
        <aside className="hero-availability tile tile--ink"><span className="availability-light" /><p>{site.brand.availability}</p><span>{site.brand.location}</span></aside>
        <aside className="hero-note tile tile--lilac"><span className="note-mark" aria-hidden="true" /><p>{site.hero.note}</p></aside>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-heading">
        <div className="section-heading"><h2 id="work-heading">{site.work.heading}</h2><p>{site.work.body}</p></div>
        <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>

      <section className="about-grid" id="about" aria-labelledby="about-heading">
        <div className="about-statement tile tile--butter"><h2 id="about-heading">{site.about.heading}</h2><p>{site.about.body}</p></div>
        <div className="principles-grid">{site.about.principles.map((principle, index) => <article className={`principle principle--${index + 1}`} key={principle.title}><span className="principle-index">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div>
      </section>

      <section className="experience-section" id="experience" aria-labelledby="experience-heading">
        <div className="experience-heading"><h2 id="experience-heading">{site.experience.heading}</h2></div>
        <div className="experience-list">{site.experience.items.map((item) => <article className="experience-item" key={item.period}><span>{item.period}</span><div><h3>{item.company}</h3><p>{item.role}</p></div><p>{item.detail}</p></article>)}</div>
      </section>

      <section className="contact-section tile tile--ink" id="contact" aria-labelledby="contact-heading">
        <div><h2 id="contact-heading">{site.contact.heading}</h2><p>{site.contact.body}</p></div>
        <div className="contact-actions"><a className="button button--light" href={site.contact.cta.href} target="_blank" rel="noreferrer">{site.contact.cta.label}<ArrowIcon /></a><a className="contact-email" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div>
      </section>
      <footer><span>{site.footer.label}</span><span>{site.footer.year}</span></footer>
    </main>
  )
}

export default App
