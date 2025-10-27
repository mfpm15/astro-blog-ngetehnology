/* This is a script to create a new post markdown file with full template */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

let args = process.argv.slice(2)

// Filter out "--" that pnpm/npm adds
args = args.filter(arg => arg !== "--")

if (args.length === 0) {
  console.error(`Error: No filename argument provided
Usage: pnpm run new-post -- <filename>
   or: node scripts/new-post.js <filename>`)
  process.exit(1) // Terminate the script and return error code 1
}

let fileName = args[0]

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i
if (!fileExtensionRegex.test(fileName)) {
  fileName += ".md"
}

const targetDir = "./src/content/posts/"
const fullPath = path.join(targetDir, fileName)

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists `)
  process.exit(1)
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath)
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
}

// Read template file
const templatePath = path.join(__dirname, "post-template.md")

if (!fs.existsSync(templatePath)) {
  console.error(`Error: Template file not found at ${templatePath}`)
  console.error("Please ensure post-template.md exists in the scripts directory")
  process.exit(1)
}

let content = fs.readFileSync(templatePath, "utf-8")

// Replace placeholders in template
content = content.replace(/\{\{DATE\}\}/g, getDate())

fs.writeFileSync(path.join(targetDir, fileName), content)

console.log(`✅ Post created: ${fullPath}`)
console.log(`📝 Template used: ${templatePath}`)
console.log(``)
console.log(`📌 Next steps:`)
console.log(`   1. Edit the file: ${fullPath}`)
console.log(`   2. Replace [PLACEHOLDER] with actual content`)
console.log(`   3. Add cover image: ${path.join(dirPath, "cover.webp")}`)
console.log(`   4. Preview: pnpm dev`)
console.log(`   5. Commit and push when ready!`)
console.log(``)
console.log(`💡 Tip: Lihat CARA-MEMBUAT-POSTINGAN.md untuk panduan lengkap!`)
