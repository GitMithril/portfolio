"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Github, Linkedin } from "lucide-react"
import { useTheme } from "next-themes"
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle"
import { BoxReveal } from "@/components/magicui/box-reveal"
import LogoLoop from "@/components/reactbits/logoloop"
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiGoogle,
  SiAnthropic,
  SiOpenai,
  SiTailwindcss,
  SiFastapi,
  SiVercel,
  SiGithub,
  SiPytorch,
  SiScikitlearn,
  SiFigma,
  SiNotion,
  SiSlack,
  SiPostman,
} from "react-icons/si"

// ============================================
// DYNAMIC CONTENT CONFIGURATION
// ============================================

const TECH_LOGOS = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiGoogle />, title: "Gemini", href: "https://deepmind.google/technologies/gemini/" },
  { node: <SiAnthropic />, title: "Claude", href: "https://www.anthropic.com" },
  { node: <SiOpenai />, title: "ChatGPT", href: "https://openai.com" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFastapi />, title: "FastBI", href: "https://fastapi.tiangolo.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" },
  { node: <SiScikitlearn />, title: "Scikit-Learn", href: "https://scikit-learn.org" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
  { node: <SiNotion />, title: "Notion", href: "https://www.notion.so" },
  { node: <SiSlack />, title: "Slack", href: "https://slack.com" },
  { node: <SiPostman />, title: "Postman", href: "https://www.postman.com" },
  { node: <SiVercel />, title: "v0.dev", href: "https://v0.dev" },
]

// Personal Information
const PERSONAL_INFO = {
  firstName: "Abdullah",
  lastName: "Ejaz",
  tagline: "Computer Science enthusiast passionate about exploring the tech world through",
  taglineHighlights: ["Design", "Programming & Development"],
  status: "Available for opportunities",
  location: "Faisalabad, Pakistan",
  email: "killerbrine55@gmail.com",
  phone: "+92-306-1663177",
  bio: "A passionate computer enthusiast with a mission to improve basic life necessities and make them as simple as the pressing of a button.",
  footer: "Design | Program | Develop",
}

// Current Position
const CURRENT_POSITION = {
  title: "Computer Science Student",
  organization: "NUST, Islamabad",
  period: "2023 — 2027",
}

// Focus Areas/Skills
const FOCUS_AREAS = [
  "Full Stack Development",
  "Mobile App Dev",
  "UI/UX Engineering",
  "RAG",
  "AI/ML",
  "LLMs/GenAI",
  "Graphic Design",
]

// Education Items
const EDUCATION_ITEMS = [
  {
    year: "2023 — Present",
    degree: "Bachelor of Computer Science",
    institution: "NUST - Islamabad",
    details: "CGPA: 3.66",
  },
  {
    year: "2021 — 2023",
    degree: "A-Levels - Computer Science",
    institution: "The City School",
    details: "Grades: 2A* 1A",
  },
  {
    year: "2019 — 2021",
    degree: "O-Levels - Computer Science",
    institution: "The City School",
    details: "Grades: 3A* 5A",
  },
]

// Experience Items
const EXPERIENCE_ITEMS = [
  {
    year: "2024 - 25",
    role: "Graphics Designer",
    company: "Google Developers Group NUST",
    description: "Created visual designs and branding materials for tech events and community initiatives.",
    tech: ["Figma", "Photoshop", "Canva"],
  },
  {
    year: "2021",
    role: "Programming Intern",
    company: "DevDen Faisalabad",
    description: "Developed web applications and learned industry best practices in software development.",
    tech: ["C++", "JavaScript"],
  },
]

// Projects
const PROJECTS = [
  {
    title: "CrimeVision",
    excerpt: "Built a MERN full-stack crime data platform with real-time mapping, AI-based trend forecasting, and safe route planning. Features include public crime reporting, analytics dashboards, and heatmap visualizations.",
    tech: "React, Node.js, MongoDB",
    category: "Crime Analysis Platform",
    type: ["Web"],
    link: "https://www.crimevision.live/", // Add project URL here
  },
  {
    title: "TheAnnoyingTraps",
    excerpt: "A Python game based on fundamental AI concepts including Genetic Algorithms, Fuzzy Logic, and Procedural Generation to create a fun and addicting gameplay experience. Players navigate through increasingly complex trap-filled levels that adapt to their playstyle.",
    tech: "Python, Pygame, AI",
    category: "Game Development",
    type: ["Game", "AI/ML"],
    link: "https://github.com/GitMithril/The_Annoying_Traps", // Add project URL here
  },
  {
    title: "The Stronghold Reckoning",
    excerpt: "An SFML-based C++ game inspired by Clash of Clans, featuring strategic gameplay, resource management, and base building mechanics.",
    tech: "C++, SFML",
    category: "Game Development",
    type: ["Game"],
    link: "https://github.com/GitMithril/Stronghold_Reckon", // Add project URL here
  },
  {
    title: "Smog Penalty",
    excerpt: "ML Based Web Application to Predict power lost due to smog levels (PM2.5) in the air, using regression and tree based models and data from sources such as NASA POWER and OpenAQ for weather. Trained on 3 years of data.",
    tech: "Python, ML, Web Development",
    category: "ML / WebDev",
    type: ["Web", "AI/ML"],
    link: "https://github.com/GitMithril/Smog-Penalty", // Add project URL here
  },
]

// Technical Skills
const TECHNICAL_SKILLS = [
  "Web Design",
  "MERN Stack",
  "Figma",
  "Databases",
  "Problem-Solving",
  "Design Thinking",
  "Photoshop/Canva",
  "Scikit-Learn",
  "Data Analysis Tools",
  "Git & GitHub",
]

// Programming Languages
const PROGRAMMING_LANGUAGES = [
  "C/C++",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "SQL",
]

// Key Courses
const KEY_COURSES = [
  {
    title: "Machine Learning Specialization",
    provider: "By Andrew Ng (Stanford/Coursera)",
  },
  {
    title: "UI/UX Design Fundamentals",
    provider: "Google Design Certification",
  },
]

// Social Links
const SOCIAL_LINKS = [
  { name: "GitHub", handle: "@GitMithril", url: "https://github.com/GitMithril" },
  { name: "LinkedIn", handle: "@abdullah-ejazz", url: "https://www.linkedin.com/in/abdullah-ejazz/" },
]

// Navigation Sections
const NAV_SECTIONS = ["intro", "education", "experience", "projects", "skills", "connect"]

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Projects Filter & Pagination State
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === "All") return true
    return project.type.includes(activeCategory)
  })

  const totalPages = Math.ceil(filteredProjects.length / 4)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * 4,
    currentPage * 4,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Social Links - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-5 px-4 py-2.5 rounded-2xl bg-background/80 backdrop-blur-sm border-0 border-border shadow-sm">
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.name}
            >
              {link.name === "GitHub" ? <Github className="w-5 h-5" /> : <Linkedin className="w-5 h-5" />}
            </Link>
          ))}
        </div>
      </div>

      {/* Animated Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatedThemeToggle variant="circle" start="top-right" />
      </div>

      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block group p-4">
        <div className="flex flex-col gap-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section} className="relative flex items-center">
              <button
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
                className={`w-2 h-8 rounded-full transition-all duration-500 ${
                  activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Navigate to ${section}`}
              />
              <span className="absolute left-6 text-xs font-mono uppercase tracking-wider text-muted-foreground whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none">
                {section}
              </span>
            </div>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex flex-col justify-center gap-15 py-12"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <BoxReveal boxColor={"#b3b3b3"} duration={0.5}>
                  <div className="text-sm pl-1 text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2026</div>
                </BoxReveal>
                <BoxReveal boxColor={"#939393"} duration={0.5}>
                  <h1 className="text-5xl pb-3 sm:text-6xl lg:text-7xl font-light tracking-tight">
                    {PERSONAL_INFO.firstName}
                    <br />
                    <span className="text-muted-foreground">{PERSONAL_INFO.lastName}</span>
                  </h1>
                </BoxReveal>
              </div>

              <div className="space-y-6 max-w-md">
                <BoxReveal boxColor={"#b3b3b3"} duration={0.5}>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    {PERSONAL_INFO.tagline}
                    {PERSONAL_INFO.taglineHighlights.map((highlight, idx) => (
                      <span key={highlight}>
                        <span className="text-foreground"> {highlight}</span>
                        {idx < PERSONAL_INFO.taglineHighlights.length - 1 ? "," : "."}
                      </span>
                    ))}
                  </p>
                </BoxReveal>

                <BoxReveal boxColor={"#939393"} duration={0.5}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {PERSONAL_INFO.status}
                    </div>
                    <div>{PERSONAL_INFO.location}</div>
                  </div>
                </BoxReveal>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <BoxReveal boxColor={"#939393"} duration={0.5}>
                  <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                </BoxReveal>
                <BoxReveal boxColor={"#b3b3b3"} duration={0.5}>
                  <div className="space-y-2">
                    <div className="text-foreground">{CURRENT_POSITION.title}</div>
                    <div className="text-muted-foreground">@ {CURRENT_POSITION.organization}</div>
                    <div className="text-xs text-muted-foreground">{CURRENT_POSITION.period}</div>
                  </div>
                </BoxReveal>
              </div>

              <div className="space-y-4">
                <BoxReveal boxColor={"#939393"} duration={0.5}>
                  <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                </BoxReveal>
                <BoxReveal boxColor={"#b3b3b3"} duration={0.5}>
                  <div className="flex flex-wrap gap-2">
                    {FOCUS_AREAS.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </BoxReveal>
              </div>
            </div>
          </div>
          
          <div className="w-full pt-0 relative max-w-[90vw] mx-auto">
            {mounted && (
              <LogoLoop
                logos={TECH_LOGOS}
                speed={40}
                direction="left"
                logoHeight={32}
                gap={50}
                pauseOnHover={true}
                fadeOut={true}
                fadeOutColor={(resolvedTheme || theme) === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)'}
                className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            )}
          </div>
        </header>

        <section
          id="education"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-8 sm:space-y-12">
            <h2 className="text-3xl sm:text-4xl font-light">Education</h2>

            <div className="space-y-4">
              {EDUCATION_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-6 py-4 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-3">
                    <div className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {item.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <h3 className="text-base sm:text-lg font-medium">{item.degree}</h3>
                    <div className="text-sm text-muted-foreground">{item.institution}</div>
                  </div>

                  <div className="lg:col-span-3 flex items-start lg:justify-end">
                    <span className="text-sm text-muted-foreground">{item.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2024</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {EXPERIENCE_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {item.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{item.role}</h3>
                      <div className="text-muted-foreground">{item.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{item.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl font-light">Key Projects</h2>
              <div className="flex flex-wrap gap-2">
                {["All", "Web", "Game", "AI/ML"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-foreground text-background"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {paginatedProjects.map((project, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{project.category}</span>
                      <span>{project.tech}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{project.excerpt}</p>

                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      >
                        <span>View project</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all ${
                        currentPage === page
                          ? "bg-foreground text-background"
                          : "bg-muted/30 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => { sectionsRef.current[4] = el }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Skills & Languages</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-muted-foreground">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {TECHNICAL_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-medium text-muted-foreground">Programming Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-border">
              <h3 className="text-xl font-medium text-muted-foreground">Key Courses</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {KEY_COURSES.map((course, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">{course.provider}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[5] = el }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>

                <div className="space-y-4">
                  <Link
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">{PERSONAL_INFO.email}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <div className="text-muted-foreground">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">{PERSONAL_INFO.footer}</div>
            </div>

            <div className="flex items-center gap-4">
              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
