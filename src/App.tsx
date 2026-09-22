import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, Award, BriefcaseBusiness, ChevronDown, Circle, Diamond, ExternalLink, Hexagon, Mail, MousePointer2, Pen, PenTool, Pointer, Sparkles, Square, Star, Triangle, Trophy } from 'lucide-react'
import site from './data/site.json'
import { caseStudyContentBySlug, projects } from './content/projects'
import personalGallery from './data/personalGallery.json'
import heroProfileImage from './assets/hero-profile.png'
import type { ProjectRecord } from './types/portfolio'
import './Portfolio.css'

type GalleryItem = {
  id: string
  title: string
  tag: string
  cornerText: string
  imageUrl: string
  tilt: number
  theme: 'acid' | 'peach' | 'blue' | 'lilac' | 'paper' | 'signal'
}
const galleryItems = personalGallery as GalleryItem[]
const motionEase = [0.16, 1, 0.3, 1] as const

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: motionEase,
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
}

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: motionEase },
  },
}

const staggerGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: motionEase },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: motionEase },
  },
}

const galleryCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: motionEase },
  },
}
const appBase = import.meta.env.BASE_URL.replace(/\/$/, '')
const appPath = (path = '/') => `${appBase}${path.startsWith('/') ? path : `/${path}`}`
type IntroHighlight = 'blue' | 'lilac' | 'acid'
type IntroSegment = { text: string; highlight?: IntroHighlight }
const introHighlightColors: Record<IntroHighlight, string> = { blue: '#d5e8ff', lilac: '#d8d0fb', acid: '#d7efa0' }
const introAnimationStart = 0.18
const introAnimationEnd = 0.94

function getCaseImages(project: ProjectRecord) {
  return [project.image, ...(project.caseImages || [])]
}

function Cursor() {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const cursorX = useSpring(x, { damping: 26, stiffness: 420, mass: 0.35 })
  const cursorY = useSpring(y, { damping: 26, stiffness: 420, mass: 0.35 })
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (reducedMotion) return undefined
    const moveCursor = (event: PointerEvent) => {
      x.set(event.clientX - 24)
      y.set(event.clientY - 24)
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor-label]') : null
      setLabel(target?.dataset.cursorLabel ?? '')
    }
    window.addEventListener('pointermove', moveCursor, { passive: true })
    return () => window.removeEventListener('pointermove', moveCursor)
  }, [reducedMotion, x, y])

  if (reducedMotion) return null
  return <motion.div className={`site-cursor ${label ? 'site-cursor--labelled' : ''}`} style={{ x: cursorX, y: cursorY }} aria-hidden="true"><MousePointer2 size={16} /><span>{label}</span></motion.div>
}

function Placeholder({ project, image = project.image, compact = false, variant = 0, className = '' }: { project: ProjectRecord; image?: ProjectRecord['image']; compact?: boolean; variant?: number; className?: string }) {
  return <div className={`media-placeholder media-placeholder--${project.theme} media-placeholder--variant-${variant % 3} ${compact ? 'media-placeholder--compact' : ''} ${className}`} role="img" aria-label={image.alt}>
    <span className="media-placeholder__caption">{site.caseStudy.imagePlaceholderLabel}</span><span className="media-placeholder__bar media-placeholder__bar--one" /><span className="media-placeholder__bar media-placeholder__bar--two" /><span className="media-placeholder__block" /><span className="media-placeholder__dot media-placeholder__dot--one" /><span className="media-placeholder__dot media-placeholder__dot--two" />
  </div>
}

function ProjectArtifact({ project, image = project.image, compact = false, variant = 0, className = '' }: { project: ProjectRecord; image?: ProjectRecord['image']; compact?: boolean; variant?: number; className?: string }) {
  if (image.src.startsWith('placeholder:')) return <Placeholder project={project} image={image} compact={compact} variant={variant} className={className} />
  const src = image.src.startsWith('/') ? appPath(image.src) : image.src
  return <figure className={`project-artifact project-artifact--${project.theme} ${compact ? 'project-artifact--compact' : ''} ${className}`}><img src={src} alt={image.alt} /></figure>
}

function MarkdownImage({ line, project, imageIndex }: { line: string; project: ProjectRecord; imageIndex: number }) {
  const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
  if (!image) return null
  const caseImages = getCaseImages(project)
  const selectedImage = image[2].startsWith('case:')
    ? caseImages[Number(image[2].slice('case:'.length))] ?? caseImages[imageIndex] ?? project.image
    : { alt: image[1], src: image[2] }
  if (selectedImage.src.startsWith('asset:') || selectedImage.src.startsWith('placeholder:')) {
    return <figure className="case-visual"><ProjectArtifact project={project} image={selectedImage} variant={imageIndex + 1} className="case-visual__artifact" /><figcaption>{selectedImage.caption ?? selectedImage.alt}</figcaption></figure>
  }
  const src = selectedImage.src.startsWith('/') ? appPath(selectedImage.src) : selectedImage.src
  return <figure className="case-visual"><img src={src} alt={selectedImage.alt} /><figcaption>{selectedImage.caption ?? selectedImage.alt}</figcaption></figure>
}

function Header() {
  return <motion.header className="portfolio-header" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: motionEase }}>
    <a className="portfolio-mark" href={appPath()} aria-label={site.brand.name} data-cursor-label="Home"><span>{site.brand.monogram}</span><strong>{site.brand.name}</strong></a>
    <nav aria-label="Primary navigation">{site.navigation.map((item) => <a key={item.href} href={appPath(item.href)} data-cursor-label={item.label}>{item.label}</a>)}</nav>
    <a className="portfolio-location" href={appPath('/#contact')} data-cursor-label="Contact">Contact<ArrowUpRight size={14} /></a>
  </motion.header>
}

function ProjectCard({ project, featured = false, compact = false }: { project: ProjectRecord; featured?: boolean; compact?: boolean }) {
  return <motion.a variants={cardItemVariants} whileHover={{ y: -7, transition: { duration: 0.25, ease: motionEase } }} className={`showcase-card showcase-card--${project.theme} ${featured ? 'showcase-card--featured' : ''} ${compact ? 'showcase-card--compact' : ''}`} href={appPath(`/work/${project.slug}`)} data-cursor-label="View case study">
    <div className="showcase-card__meta"><span>{project.category}</span>{!compact && <span>{project.industry}</span>}</div><ProjectArtifact project={project} compact /><div className="showcase-card__copy"><h3>{project.shortTitle}</h3><p>{project.summary}</p></div><div className="showcase-card__footer">{!compact && <span>{project.tags.slice(0, 2).join(' · ')}</span>}<ArrowUpRight /></div>
  </motion.a>
}

function SectionReveal({ children, className, id, labelledBy, amount = 0.12 }: { children: ReactNode; className: string; id?: string; labelledBy?: string; amount?: number }) {
  return <motion.section id={id} className={className} aria-labelledby={labelledBy} initial="hidden" whileInView="visible" viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }} variants={sectionVariants}>{children}</motion.section>
}

function ExperienceSection() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.matchMedia('(max-width: 620px)').matches : false)
  const [activeIndex, setActiveIndex] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 620px)').matches ? -1 : 0)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 620px)')
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      if (e.matches) setActiveIndex(-1)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const toggleIndex = (index: number) => setActiveIndex((prev) => prev === index ? -1 : index)
  const activeExperience = activeIndex >= 0 ? site.experience.items[activeIndex] : null
  const caseStudies = activeExperience ? activeExperience.projectSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is ProjectRecord => Boolean(project)) : []
  return <SectionReveal className="experience-section" id="experience" labelledBy="experience-heading">
    <motion.div className="experience-section__intro" variants={sectionHeaderVariants}><BriefcaseBusiness aria-hidden="true" /><h2 id="experience-heading">{site.experience.heading}</h2><p>{site.experience.body}</p><span className="experience-section__line" aria-hidden="true"><PenTool /><Sparkles /></span></motion.div>
    <motion.div className="experience-timeline" variants={staggerGridVariants}>{site.experience.items.map((item, index) => {
      const isActive = activeIndex === index
      return <motion.article key={item.company} variants={listItemVariants} className={`experience-entry ${isActive ? 'is-active' : ''} ${item.highlighted ? 'is-highlighted' : ''}`} onMouseEnter={() => !isMobile && setActiveIndex(index)} onFocus={() => !isMobile && setActiveIndex(index)}>
        <button type="button" onClick={() => isMobile ? toggleIndex(index) : setActiveIndex(index)} aria-expanded={isActive} className="experience-entry__trigger" data-cursor-label={isActive ? 'Active' : 'Explore'}>
          <span className="experience-entry__title"><small className="experience-entry__period">{item.period}</small><strong>{item.company}</strong><small>{item.role} · {item.duration}</small></span><ChevronDown className="experience-entry__chevron" aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>{isActive && <motion.div className="experience-entry__details" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: motionEase }}><div className="experience-entry__details-inner"><p className="experience-entry__summary">{item.summary}</p><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><div className="experience-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{item.awards.length > 0 && <div className="experience-awards"><span><Trophy aria-hidden="true" />{site.experience.awardLabel}</span><div>{item.awards.map((award) => <mark key={award}><Award aria-hidden="true" />{award}</mark>)}</div></div>}{caseStudies.length > 0 && <div className="experience-projects"><span><Star aria-hidden="true" />{site.experience.projectLabel}</span><div>{caseStudies.map((project) => <a href={appPath(`/work/${project.slug}`)} key={project.slug} data-cursor-label="Open case study">{project.shortTitle}<ExternalLink aria-hidden="true" /></a>)}</div></div>}</div></motion.div>}</AnimatePresence>
      </motion.article>
    })}</motion.div>
  </SectionReveal>
}

function CanvasBand({ className, children }: { className: string; children: ReactNode }) {
  return <div className={`canvas-band ${className}`} aria-hidden="true"><svg className="canvas-band__curve" viewBox="0 0 140 64" fill="none"><path d="M4 42C20 10 58 11 74 34C91 57 112 54 136 22" /></svg>{children}</div>
}

function ReadingWords({ text, startIndex, totalWords, progress, reducedMotion, alwaysInk = false }: { text: string; startIndex: number; totalWords: number; progress: MotionValue<number>; reducedMotion: boolean | null; alwaysInk?: boolean }) {
  const words = text.trim().split(/\s+/)
  return <>{words.map((word, index) => <ReadingWord key={`${word}-${index}`} word={word} index={startIndex + index} totalWords={totalWords} progress={progress} reducedMotion={reducedMotion} alwaysInk={alwaysInk} />)}</>
}

function ReadingWord({ word, index, totalWords, progress, reducedMotion, alwaysInk }: { word: string; index: number; totalWords: number; progress: MotionValue<number>; reducedMotion: boolean | null; alwaysInk: boolean }) {
  const start = introAnimationStart + (index / Math.max(totalWords - 1, 1)) * 0.66
  const end = Math.min(start + 0.026, 0.98)
  const color = useTransform(progress, [start, end], ['#858880', '#141511'])
  const y = useTransform(progress, [start, Math.min(start + 0.065, 0.98)], [8, 0])
  const scale = useTransform(progress, [start, Math.min(start + 0.065, 0.98)], [0.96, 1])
  const opacity = useTransform(progress, [start, end], [0.88, 1])
  return <motion.span className="scroll-intro__word" style={{ color: reducedMotion || alwaysInk ? '#141511' : color, y: reducedMotion || alwaysInk ? 0 : y, scale: reducedMotion || alwaysInk ? 1 : scale, opacity: reducedMotion || alwaysInk ? 1 : opacity }}>{word}{' '}</motion.span>
}

function ReadingPhrase({ text, highlight, startIndex, totalWords, progress, reducedMotion }: { text: string; highlight: IntroHighlight; startIndex: number; totalWords: number; progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const start = introAnimationStart + (startIndex / Math.max(totalWords - 1, 1)) * 0.66
  const end = Math.min(start + 0.095, 0.98)
  const insetRight = useTransform(progress, [start, end], [100, 0])
  const clipPath = useTransform(insetRight, (v) => `inset(0 ${Math.max(Math.min(v, 100), 0)}% 0 0 round .12em)`)
  return <span className={`scroll-intro__phrase scroll-intro__phrase--${highlight}`}><motion.span className="scroll-intro__phrase-fill" aria-hidden="true" style={{ backgroundColor: introHighlightColors[highlight], clipPath: reducedMotion ? 'none' : clipPath }} /><span className="scroll-intro__phrase-text"><ReadingWords text={text} startIndex={startIndex} totalWords={totalWords} progress={progress} reducedMotion={reducedMotion} alwaysInk /></span></span>
}

function ScrollIntroDecorations({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean | null }) {
  const s = introAnimationStart
  const e = introAnimationEnd

  /* ── Primary decorations ── */
  const starY = useTransform(progress, [s, e], [-28, 94])
  const starRotate = useTransform(progress, [s, e], [-18, 36])
  const cursorY = useTransform(progress, [s, e], [88, -62])
  const cursorX = useTransform(progress, [s, e], [-30, 58])
  const cursorRotate = useTransform(progress, [s, e], [-32, 8])
  const ringY = useTransform(progress, [s, e], [-52, 58])

  /* ── Thread line ── */
  const threadY = useTransform(progress, [s, e], [42, -38])
  const threadPathLength = useTransform(progress, [s, e], [0.28, 1])

  /* ── Dots ── */
  const acidDotY = useTransform(progress, [s, e], [-18, 78])
  const blueDotY = useTransform(progress, [s, e], [52, -46])
  const lilacDotX = useTransform(progress, [s, e], [-32, 48])

  /* ── Additional shapes ── */
  const hexY = useTransform(progress, [s, e], [42, -72])
  const hexRotate = useTransform(progress, [s, e], [0, 45])
  const triangleY = useTransform(progress, [s, e], [-36, 88])
  const triangleRotate = useTransform(progress, [s, e], [15, -30])
  const diamondY = useTransform(progress, [s, e], [64, -48])
  const diamondX = useTransform(progress, [s, e], [20, -35])
  const diamondRotate = useTransform(progress, [s, e], [-12, 24])
  const squareY = useTransform(progress, [s, e], [-22, 56])
  const squareRotate = useTransform(progress, [s, e], [8, -18])

  /* ── Additional cursors ── */
  const cursor2Y = useTransform(progress, [s, e], [-44, 66])
  const cursor2X = useTransform(progress, [s, e], [18, -28])
  const cursor2Rotate = useTransform(progress, [s, e], [12, -16])
  const penY = useTransform(progress, [s, e], [32, -54])
  const penRotate = useTransform(progress, [s, e], [-25, 18])
  const pointerY = useTransform(progress, [s, e], [-30, 72])
  const pointerRotate = useTransform(progress, [s, e], [22, -12])

  /* ── Extra lines / threads ── */
  const thread2Y = useTransform(progress, [s, e], [-24, 52])
  const thread2PathLength = useTransform(progress, [s, e], [0.15, 0.88])
  const thread3Y = useTransform(progress, [s, e], [28, -36])
  const thread3PathLength = useTransform(progress, [s, e], [0.08, 0.72])

  /* ── Extra dots ── */
  const dotPeachY = useTransform(progress, [s, e], [36, -42])
  const dotSmallAcidY = useTransform(progress, [s, e], [-14, 52])
  const dotSmallBlueX = useTransform(progress, [s, e], [24, -38])
  const dotMedLilacY = useTransform(progress, [s, e], [48, -26])

  /* ── Filled shapes ── */
  const filledCircleY = useTransform(progress, [s, e], [-34, 64])
  const filledStarY = useTransform(progress, [s, e], [22, -56])
  const filledStarRotate = useTransform(progress, [s, e], [-15, 28])

  const m = (v: number | MotionValue<number>) => reducedMotion ? 0 : v

  return <div className="scroll-intro__decorations" aria-hidden="true">
    {/* ── Thread lines ── */}
    <motion.svg className="scroll-intro__thread" viewBox="0 0 1440 640" preserveAspectRatio="none" style={{ y: m(threadY) }}><motion.path d="M-40 356C154 252 306 475 510 382C704 295 794 214 996 328C1178 431 1288 271 1488 186" style={{ pathLength: reducedMotion ? 1 : threadPathLength }} /></motion.svg>
    <motion.svg className="scroll-intro__thread scroll-intro__thread--secondary" viewBox="0 0 1440 640" preserveAspectRatio="none" style={{ y: m(thread2Y) }}><motion.path d="M-20 186C168 312 340 142 528 248C712 352 864 192 1048 284C1212 366 1336 196 1468 284" style={{ pathLength: reducedMotion ? 1 : thread2PathLength }} /></motion.svg>
    <motion.svg className="scroll-intro__thread scroll-intro__thread--dashed" viewBox="0 0 1440 640" preserveAspectRatio="none" style={{ y: m(thread3Y) }}><motion.path d="M-60 412C120 298 282 518 468 418C654 318 826 448 1008 348C1192 246 1312 386 1496 302" style={{ pathLength: reducedMotion ? 1 : thread3PathLength }} /></motion.svg>

    {/* ── Primary decorations (original) ── */}
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--star" style={{ y: m(starY), rotate: m(starRotate) }}><Star /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--cursor" style={{ x: m(cursorX), y: m(cursorY), rotate: m(cursorRotate) }}><MousePointer2 /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--ring" style={{ y: m(ringY) }}><Circle /></motion.span>

    {/* ── Additional cursors ── */}
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--cursor2" style={{ x: m(cursor2X), y: m(cursor2Y), rotate: m(cursor2Rotate) }}><Pointer /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--pen" style={{ y: m(penY), rotate: m(penRotate) }}><Pen /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--pointer" style={{ y: m(pointerY), rotate: m(pointerRotate) }}><MousePointer2 /></motion.span>

    {/* ── Outlined shapes ── */}
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--hexagon" style={{ y: m(hexY), rotate: m(hexRotate) }}><Hexagon /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--triangle" style={{ y: m(triangleY), rotate: m(triangleRotate) }}><Triangle /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--diamond" style={{ x: m(diamondX), y: m(diamondY), rotate: m(diamondRotate) }}><Diamond /></motion.span>
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--square" style={{ y: m(squareY), rotate: m(squareRotate) }}><Square /></motion.span>

    {/* ── Filled shapes ── */}
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--filled-circle" style={{ y: m(filledCircleY) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--filled-star" style={{ y: m(filledStarY), rotate: m(filledStarRotate) }}><Star /></motion.span>

    {/* ── Dots (original + new) ── */}
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot scroll-intro__decoration--dot-acid" style={{ y: m(acidDotY) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot scroll-intro__decoration--dot-blue" style={{ y: m(blueDotY) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot scroll-intro__decoration--dot-lilac" style={{ x: m(lilacDotX) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot scroll-intro__decoration--dot-peach" style={{ y: m(dotPeachY) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot-sm scroll-intro__decoration--dot-sm-acid" style={{ y: m(dotSmallAcidY) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot-sm scroll-intro__decoration--dot-sm-blue" style={{ x: m(dotSmallBlueX) }} />
    <motion.span className="scroll-intro__decoration scroll-intro__decoration--dot-md scroll-intro__decoration--dot-md-lilac" style={{ y: m(dotMedLilacY) }} />
  </div>
}

function ScrollIntroduction() {
  const introduction = site.home.introduction as { segments: IntroSegment[] }
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const skipAnimation = Boolean(reducedMotion)
  const totalWords = introduction.segments.reduce((count, segment) => count + segment.text.trim().split(/\s+/).length, 0)
  const segmentStarts = useMemo(() => {
    return introduction.segments.reduce<{ starts: number[]; running: number }>(
      (acc, segment) => ({
        starts: [...acc.starts, acc.running],
        running: acc.running + segment.text.trim().split(/\s+/).length,
      }),
      { starts: [], running: 0 }
    ).starts
  }, [introduction.segments])

  return <section ref={sectionRef} id="about" className="scroll-intro">
    <div className="scroll-intro__stage"><ScrollIntroDecorations progress={scrollYProgress} reducedMotion={skipAnimation} /><p>{introduction.segments.map((segment, index) => {
      const startIndex = segmentStarts[index]
      return segment.highlight
        ? <ReadingPhrase key={index} text={segment.text} highlight={segment.highlight} startIndex={startIndex} totalWords={totalWords} progress={scrollYProgress} reducedMotion={skipAnimation} />
        : <ReadingWords key={index} text={segment.text} startIndex={startIndex} totalWords={totalWords} progress={scrollYProgress} reducedMotion={skipAnimation} />
    })}</p></div>
  </section>
}

function PersonalGallerySection() {
  return <SectionReveal className="personal-gallery" id="life" labelledBy="life-heading">
    <motion.div variants={sectionHeaderVariants}>
      <CanvasBand className="canvas-band--gallery"><span className="canvas-mark canvas-mark--camera"><Sparkles /><i /></span></CanvasBand>
      <div className="section-title">
        <h2 id="life-heading">Life and curiosities off the screen.</h2>
        <div className="section-title__aside">
          <p>Perspectives gathered away from the interface: 35mm exposures, high-altitude trails, ceramic craft, and slow morning rituals.</p>
        </div>
      </div>
    </motion.div>
    <motion.div className="personal-gallery__grid" variants={staggerGridVariants}>
      {galleryItems.map((item) => (
        <motion.article
          key={item.id}
          variants={galleryCardVariants}
          whileHover={{ scale: 1.08, zIndex: 30, transition: { duration: 0.25, ease: motionEase } }}
          className={`gallery-card gallery-card--${item.theme}`}
          style={{ '--tilt-deg': `${item.tilt}deg` } as React.CSSProperties}
          tabIndex={0}
          data-cursor-label={item.tag}
        >
          <div className="gallery-card__artifact">
            <img src={item.imageUrl} alt={item.title} loading="lazy" className="gallery-card__img" />
            <div className="gallery-card__shade" aria-hidden="true" />
          </div>
          <div className="gallery-card__tag-pill">
            <span className="gallery-card__pill-dot" aria-hidden="true" />
            <div className="gallery-card__pill-content">
              <strong>{item.title}</strong>
              <p>{item.cornerText}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  </SectionReveal>
}

function HomePage() {
  const selectedWork = projects
    .filter((project) => project.featured)
    .sort((left, right) => {
      if (left.homeOrder !== undefined && right.homeOrder !== undefined) return left.homeOrder - right.homeOrder
      if (left.homeOrder !== undefined) return -1
      if (right.homeOrder !== undefined) return 1
      return left.slug.localeCompare(right.slug)
    })
  return <>
    <motion.section className="showcase-hero" aria-labelledby="home-heading" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}>
      <motion.div className="showcase-hero__intro" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65, ease: motionEase }}><span className="showcase-hero__name">{site.brand.name}</span><h1 id="home-heading">{site.home.heading}</h1><div className="showcase-hero__intro-footer"><span>{site.brand.role}</span><a className="inline-link" href={appPath(site.home.secondaryAction.href)} data-cursor-label="Read more">{site.home.secondaryAction.label}<ArrowUpRight /></a></div></motion.div>
      <motion.div className="showcase-hero__profile" role="img" aria-label={site.home.profileLabel} variants={{ hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } }} transition={{ duration: 0.7, ease: motionEase }}><img src={heroProfileImage} alt="" /><Circle className="hero-motif hero-motif--profile-circle" aria-hidden="true" /><i /><b /><Sparkles className="hero-decor hero-decor--spark" aria-hidden="true" /></motion.div>
      <motion.div className="showcase-hero__statement" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65, ease: motionEase }}><MousePointer2 className="hero-motif hero-motif--pointer" aria-hidden="true" /><Star className="hero-motif hero-motif--star" aria-hidden="true" /><p>{site.home.body}</p><a className="button button--ink" href={appPath(site.home.primaryAction.href)} data-cursor-label="Explore">{site.home.primaryAction.label}<ArrowUpRight /></a></motion.div>
    </motion.section>
    <ScrollIntroduction />
    <SectionReveal className="home-work" id="work" labelledBy="selected-work">
      <motion.div variants={sectionHeaderVariants}>
        <CanvasBand className="canvas-band--work"><span className="canvas-mark canvas-mark--star"><Star /><i /></span></CanvasBand>
        <div className="section-title"><h2 id="selected-work">{site.home.workHeading}</h2><div className="section-title__aside"><a className="archive-link archive-link--top" href={appPath(site.home.archiveHref)} data-cursor-label="Browse work">{site.home.archiveLabel}<ArrowUpRight /></a><p>{site.home.workBody}</p></div></div>
      </motion.div>
      <motion.div className="featured-grid" variants={staggerGridVariants}>
        {selectedWork.map((project) => <ProjectCard key={project.slug} project={project} featured compact />)}
      </motion.div>
      <motion.a variants={sectionHeaderVariants} className="archive-link" href={appPath(site.home.archiveHref)} data-cursor-label="Browse work">{site.home.archiveLabel}<ArrowUpRight /></motion.a>
    </SectionReveal>
    <ExperienceSection />
    <PersonalGallerySection />
  </>
}

function WorkArchive() {
  const [filter, setFilter] = useState(site.archive.allLabel)
  const filters = [site.archive.allLabel, ...Array.from(new Set(projects.flatMap((project) => project.tags).filter((tag) => ['AI', 'Enterprise', 'Data', 'Design systems'].includes(tag))))]
  const visibleProjects = useMemo(() => filter === site.archive.allLabel ? projects : projects.filter((project) => project.tags.includes(filter)), [filter])
  return <SectionReveal className="archive-page" labelledBy="archive-heading">
    <motion.header className="archive-page__intro" variants={sectionHeaderVariants}>
      <h1 id="archive-heading">{site.archive.heading}</h1>
      <div><p>{site.archive.body}</p><span>{site.archive.supportingText}</span></div>
    </motion.header>
    <motion.div className="archive-page__controls" variants={sectionHeaderVariants}>
      <div className="filter-row" aria-label={site.archive.filterLabel}>
        {filters.map((item) => <button className={filter === item ? 'is-active' : ''} key={item} onClick={() => setFilter(item)} type="button" data-cursor-label={item}>{item}</button>)}
      </div>
      <p>{site.archive.controlsBody}</p>
    </motion.div>
    <motion.div className="archive-grid" layout variants={staggerGridVariants}>
      {visibleProjects.map((project) => <motion.a layout variants={cardItemVariants} whileHover={{ y: -6, transition: { duration: 0.25, ease: motionEase } }} className={`archive-project archive-project--${project.theme}`} href={appPath(`/work/${project.slug}`)} key={project.slug} transition={{ duration: 0.35, ease: motionEase }} data-cursor-label="View case study">
        <ProjectArtifact project={project} compact />
        <div className="archive-project__copy"><span>{project.category}</span><h2>{project.shortTitle}</h2><p>{project.summary}</p></div>
        <div className="archive-project__footer"><span>{project.tags.slice(0, 2).join(' · ')}</span><ArrowUpRight aria-hidden="true" /></div>
      </motion.a>)}
    </motion.div>
  </SectionReveal>
}

function MarkdownContent({ markdown, project }: { markdown: string; project: ProjectRecord }) {
  const sections: { title?: string; nodes: ReactNode[] }[] = []
  const lines = markdown.trim().split('\n')
  let index = 0
  let imageIndex = 0
  let currentSection: { title?: string; nodes: ReactNode[] } = { nodes: [] }

  while (index < lines.length) {
    const line = lines[index].trim()
    if (!line) { index += 1; continue }
    if (line.startsWith('## ')) {
      if (currentSection.title || currentSection.nodes.length > 0) {
        sections.push(currentSection)
      }
      currentSection = { title: line.slice(3), nodes: [] }
      index += 1
      continue
    }
    if (line.startsWith('![')) {
      currentSection.nodes.push(<MarkdownImage key={`img-${index}`} line={line} project={project} imageIndex={imageIndex} />)
      imageIndex += 1
      index += 1
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2))
        index += 1
      }
      currentSection.nodes.push(<ul key={`ul-${index}`}>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>)
      continue
    }
    const paragraph: string[] = []
    while (index < lines.length && lines[index].trim() && !lines[index].trim().startsWith('## ') && !lines[index].trim().startsWith('- ') && !lines[index].trim().startsWith('![')) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    currentSection.nodes.push(<p key={`p-${index}`}>{paragraph.join(' ')}</p>)
  }

  if (currentSection.title || currentSection.nodes.length > 0) {
    sections.push(currentSection)
  }

  return <div className="markdown-content">
    {sections.map((section, sIndex) => (
      <motion.section
        key={section.title ?? `sec-${sIndex}`}
        className="case-story-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
        variants={{
          hidden: { opacity: 0, y: 26 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.58, ease: motionEase, staggerChildren: 0.08 },
          },
        }}
      >
        {section.title && <motion.h2 variants={sectionHeaderVariants}>{section.title}</motion.h2>}
        {section.nodes}
      </motion.section>
    ))}
  </div>
}

function CaseStudy({ project }: { project: ProjectRecord }) {
  const content = caseStudyContentBySlug[project.slug] ?? ''
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const details = [
    ["Focus", project.category],
    [site.caseStudy.roleLabel, project.role],
    [site.caseStudy.industryLabel, project.industry],
    [site.caseStudy.durationLabel, project.duration],
    [site.caseStudy.platformLabel, project.platform],
    [site.caseStudy.toolsLabel, project.tools.join(', ') || null],
  ]
  const caseImages = getCaseImages(project)

  return <article className={`case-study case-study--${project.theme}`}>
    <motion.div className="case-study__nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: motionEase }}>
      <a className="case-back" href={appPath('/work')} data-cursor-label="All work">{site.caseStudy.backLabel}<ArrowUpRight /></a>
    </motion.div>

    <motion.header
      className="case-hero"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
    >
      <motion.div className="case-hero__title" variants={cardItemVariants}>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
      </motion.div>
      <motion.div
        className="case-hero__artifact-wrap"
        variants={{ hidden: { opacity: 0, scale: 0.96, y: 24 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: motionEase } } }}
      >
        <ProjectArtifact project={project} image={caseImages[0]} className="case-hero__artifact" />
        {caseImages[0].caption && <p className="case-hero__caption">{caseImages[0].caption}</p>}
      </motion.div>
    </motion.header>

    <motion.section
      className="case-metadata"
      aria-labelledby="project-details"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionHeaderVariants}
    >
      <h2 id="project-details">{site.caseStudy.metadataLabel}</h2>
      {details.filter(([, value]) => value).map(([label, value]) => (
        <div key={label}><span>{label}</span><p>{value}</p></div>
      ))}
    </motion.section>

    {caseImages.length > 1 && (
      <motion.section
        className="case-evidence"
        aria-label="Supporting project visuals"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
        variants={staggerGridVariants}
      >
        {caseImages.slice(1).map((image, index) => (
          <motion.div
            key={image.alt}
            className="case-evidence__slot"
            variants={{ hidden: { opacity: 0, y: 32, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: motionEase } } }}
          >
            <ProjectArtifact project={project} image={image} variant={index + 1} className="case-evidence__artifact" />
            {image.caption && <p className="case-evidence__caption">{image.caption}</p>}
          </motion.div>
        ))}
      </motion.section>
    )}

    <div className="case-layout">
      <MarkdownContent markdown={content} project={project} />
    </div>

    <motion.a
      className={`next-project next-project--${nextProject.theme}`}
      href={appPath(`/work/${nextProject.slug}`)}
      data-cursor-label="Next project"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: motionEase } } }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: motionEase } }}
    >
      <div className="next-project__copy"><strong>{nextProject.shortTitle}</strong><p>{nextProject.summary}</p></div>
      <span className="next-project__action">Next project<ArrowUpRight aria-hidden="true" /></span>
    </motion.a>
  </article>
}

function SocialIcon({ label }: { label: string }) {
  if (label === 'Email') return <Mail aria-hidden="true" />
  if (label === 'LinkedIn') return <svg className="social-brand-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V8.999h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.287zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.56 20.452h3.554V8.999H3.56z" /></svg>
  return <img className="social-brand-icon" src="https://cdn.simpleicons.org/behance/fbfaf7" alt="" aria-hidden="true" />
}
function Contact() {
  return <SectionReveal className="contact-section" id="contact" labelledBy="contact-heading">
    <motion.div className="contact-section__copy" variants={sectionHeaderVariants}>
      <h2 id="contact-heading">{site.contact.heading}</h2>
      <p>{site.contact.body}</p>
      <span className="contact-section__orbit" aria-hidden="true"><ArrowUpRight /></span>
    </motion.div>
    <motion.div className="contact-section__links" variants={staggerGridVariants}>
      {site.contact.links.map((link) => (
        <motion.a
          key={link.label}
          variants={listItemVariants}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          data-cursor-label={link.label}
        >
          <span><SocialIcon label={link.label} />{link.label}</span>
          <ArrowUpRight />
        </motion.a>
      ))}
    </motion.div>
  </SectionReveal>
}

const getAppRoute = () => {
  const fullPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const stripped = (fullPath.startsWith(appBase) ? fullPath.slice(appBase.length) : fullPath).replace(/\/+$/, '')
  return stripped || '/'
}

function App() {
  const [path, setPath] = useState(getAppRoute)

  useEffect(() => {
    const handlePopState = () => {
      setPath(getAppRoute())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

      const anchor = (e.target as HTMLElement)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      if (anchor.target === '_blank' || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      const url = new URL(anchor.href, window.location.origin)
      if (url.origin !== window.location.origin) return

      if (url.pathname === window.location.pathname && url.hash) {
        e.preventDefault()
        const targetId = url.hash.slice(1)
        window.history.pushState(null, '', url.href)
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
        return
      }

      if (url.pathname.startsWith(appBase) || url.pathname.startsWith('/')) {
        e.preventDefault()
        window.history.pushState(null, '', url.href)
        setPath(getAppRoute())
        if (url.hash) {
          const targetId = url.hash.slice(1)
          window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }))
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (!window.location.hash) return
    const targetId = window.location.hash.slice(1)
    const frame = window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView())
    return () => window.cancelAnimationFrame(frame)
  }, [path])

  const slug = path.startsWith('/work/') ? path.split('/')[2] : undefined
  const project = slug ? projects.find((item) => item.slug === slug) : undefined

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio-shell">
        <Cursor />
        <Header />
        {project ? <CaseStudy project={project} /> : path === '/work' ? <WorkArchive /> : <HomePage />}
        <Contact />
      </main>
    </MotionConfig>
  )
}

export default App
