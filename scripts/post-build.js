import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')
const caseStudiesDir = path.resolve(__dirname, '../src/content/projects')

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist!')
  process.exit(1)
}

const indexContent = fs.readFileSync(indexPath, 'utf-8')
const projects = fs.readdirSync(caseStudiesDir)
  .filter((filename) => filename.endsWith('.md'))
  .map((filename) => {
    const source = fs.readFileSync(path.join(caseStudiesDir, filename), 'utf-8')
    const match = source.match(/^---\s*\n([\s\S]*?)\n---/)
    if (!match) throw new Error(`${filename} needs JSON frontmatter between --- markers.`)
    return JSON.parse(match[1])
  })

// 1. Create dist/404.html for SPA fallback
fs.writeFileSync(path.join(distDir, '404.html'), indexContent)
console.log('✓ Created dist/404.html')

// 2. Create dist/work/index.html for /work route
const workDir = path.join(distDir, 'work')
fs.mkdirSync(workDir, { recursive: true })
fs.writeFileSync(path.join(workDir, 'index.html'), indexContent)
console.log('✓ Created dist/work/index.html')

// 3. Create dist/work/[slug]/index.html for every project route
for (const project of projects) {
  if (!project.slug) continue
  const projectDir = path.join(workDir, project.slug)
  fs.mkdirSync(projectDir, { recursive: true })
  fs.writeFileSync(path.join(projectDir, 'index.html'), indexContent)
  console.log(`✓ Created dist/work/${project.slug}/index.html`)
}

console.log('✓ All GitHub Pages static routes generated successfully.')
