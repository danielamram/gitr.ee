import { notFound } from "next/navigation"
import { RepoSpotlight } from "@/components/repo-spotlight"

// Mock data for repositories (same as in feed.tsx)
const mockRepos = [
  {
    id: "1",
    name: "next.js",
    owner: {
      login: "vercel",
      avatar_url: "/vercel-logo.png",
    },
    description: "The React Framework for the Web",
    aiSummary:
      "Production-grade React framework with hybrid static & server rendering, TypeScript support, and route pre-fetching.",
    language: "TypeScript",
    stars: 112000,
    forks: 24500,
    updated_at: "2023-05-01T12:00:00Z",
    topics: ["react", "nextjs", "javascript", "typescript", "framework", "ssr", "static-site-generator"],
    fullDescription: `
      Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
      
      Next.js has all the tools you need to make the Web. Faster.
      
      - Zero Config: Automatic compilation and bundling. Optimized for production from the start.
      - Hybrid: SSG and SSR: Pre-render pages at build time (SSG) or request time (SSR) in a single project.
      - Incremental Static Regeneration: Add and update statically pre-rendered pages incrementally after build time.
      - TypeScript Support: Automatic TypeScript configuration and compilation.
      - Fast Refresh: Fast, reliable live-editing experience, as proven at Facebook scale.
      - File-system Routing: Every component in the pages directory becomes a route.
      - API Routes: Optionally create API endpoints to provide backend functionality.
      - Built-in CSS Support: Create component-level styles with CSS modules. Built-in Sass support.
      - Image Optimization: Automatic image optimization with a built-in Image component.
    `,
    aiAnalysis: {
      whatItIs:
        "Next.js is a React framework that enables server-side rendering, static site generation, and other performance optimizations for React applications.",
      whoItsFor:
        "Frontend developers building React applications who need better performance, SEO, and developer experience than client-side React provides.",
      prosAndCons: {
        pros: [
          "Server-side rendering improves SEO and initial load performance",
          "Static site generation for blazing fast static pages",
          "Built-in API routes eliminate need for separate backend in many cases",
          "Excellent developer experience with hot reloading",
          "Strong TypeScript support",
        ],
        cons: [
          "Learning curve for developers new to SSR concepts",
          "More complex deployment than pure client-side React",
          "Some third-party React libraries may need adaptation",
        ],
      },
      whyItMatters:
        "Next.js addresses critical limitations in client-side React applications, particularly around SEO, performance, and initial load times. It's become the standard approach for production React applications.",
    },
    relatedRepos: ["2", "3", "5"],
  },
  {
    id: "2",
    name: "react",
    owner: {
      login: "facebook",
      avatar_url: "/facebook-logo.png",
    },
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    aiSummary: "The most popular JavaScript library for building interactive UIs with a component-based architecture.",
    language: "JavaScript",
    stars: 210000,
    forks: 43000,
    updated_at: "2023-04-28T10:30:00Z",
    topics: ["javascript", "library", "react", "frontend", "ui"],
    fullDescription: `
      React is a JavaScript library for building user interfaces.
      
      - Declarative: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
      
      - Component-Based: Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
      
      - Learn Once, Write Anywhere: We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.
    `,
    aiAnalysis: {
      whatItIs: "React is a JavaScript library for building user interfaces with a component-based architecture.",
      whoItsFor: "Frontend developers building interactive web applications and user interfaces.",
      prosAndCons: {
        pros: [
          "Component-based architecture promotes reusability",
          "Virtual DOM for efficient UI updates",
          "Large ecosystem and community support",
          "Backed by Facebook/Meta",
          "Works well with other libraries",
        ],
        cons: [
          "Only handles the view layer, requires additional libraries for routing, state management, etc.",
          "JSX syntax has a learning curve",
          "Can be overkill for simple websites",
        ],
      },
      whyItMatters:
        "React revolutionized frontend development by introducing a component-based approach and efficient rendering through the virtual DOM. It's become the most popular frontend library and has influenced the entire ecosystem.",
    },
    relatedRepos: ["1", "5"],
  },
  {
    id: "3",
    name: "tailwindcss",
    owner: {
      login: "tailwindlabs",
      avatar_url: "/tailwind-logo.png",
    },
    description: "A utility-first CSS framework for rapid UI development.",
    aiSummary:
      "Highly customizable, low-level CSS framework that gives you all the building blocks you need to build designs.",
    language: "CSS",
    stars: 71000,
    forks: 3600,
    updated_at: "2023-04-30T15:45:00Z",
    topics: ["css", "framework", "responsive", "utility-first", "design"],
    fullDescription: `
      Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
      
      - Utility-First: Using a utility-first workflow means you're not wasting energy inventing class names. No more adding silly class names like sidebar-inner-wrapper just to style something, and no more agonizing over the perfect abstract name for something that's really just a flex container.
      
      - Component-Friendly: While you can do a lot with just utility classes, as a project grows it can be useful to codify common patterns into higher level abstractions. Tailwind provides tools for extracting component classes from repeated utility patterns, making it easy to update multiple instances of a component from one place.
      
      - Responsive to the Core: Every Tailwind utility also comes with responsive variants, making it extremely easy to build responsive interfaces without resorting to custom CSS.
      
      - Designed to be Customized: If it makes sense to be customizable, Tailwind lets you customize it. This includes colors, border sizes, font weights, spacing utilities, breakpoints, shadows, and tons more. Tailwind is written in PostCSS and configured in JavaScript, which means you have the full power of a real programming language at your fingertips.
    `,
    aiAnalysis: {
      whatItIs:
        "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build designs directly in your markup.",
      whoItsFor:
        "Frontend developers and designers who want to rapidly build custom user interfaces without writing custom CSS.",
      prosAndCons: {
        pros: [
          "Rapid development with predefined utility classes",
          "Highly customizable through configuration",
          "Consistent spacing, typography, and color scales",
          "No need to invent class names or maintain separate CSS files",
          "Built-in responsive design utilities",
        ],
        cons: [
          "HTML can become verbose with many utility classes",
          "Learning curve for developers used to semantic CSS",
          "Initial build sizes can be large without proper optimization",
        ],
      },
      whyItMatters:
        "Tailwind CSS has changed how many developers approach styling by bringing the styling directly into the markup, eliminating the context switching between HTML and CSS files and providing a more direct way to build interfaces.",
    },
    relatedRepos: ["1", "5"],
  },
  {
    id: "4",
    name: "langchain",
    owner: {
      login: "langchain-ai",
      avatar_url: "/langchain-logo.png",
    },
    description: "Building applications with LLMs through composability",
    aiSummary: "Framework for developing applications powered by language models with components for LLM integrations.",
    language: "TypeScript",
    stars: 65000,
    forks: 9200,
    updated_at: "2023-05-02T09:15:00Z",
    topics: ["ai", "llm", "nlp", "machine-learning", "typescript", "python"],
    fullDescription: `
      LangChain is a framework for developing applications powered by language models. It enables applications that:
      
      - Are context-aware: connect a language model to sources of context (prompt instructions, few shot examples, content to ground its response in, etc.)
      - Reason: rely on a language model to reason (about how to answer based on provided context, what actions to take, etc.)
      
      LangChain provides:
      
      - Components: abstractions for working with language models, along with a collection of implementations for each abstraction. Components are modular and easy-to-use, whether you're using the rest of the LangChain framework or not
      - Off-the-shelf chains: a structured assembly of components for accomplishing specific higher-level tasks
      
      Off-the-shelf chains make it easy to get started. For complex applications, components make it easy to customize existing chains and build new ones.
    `,
    aiAnalysis: {
      whatItIs:
        "LangChain is a framework for developing applications powered by large language models (LLMs) with a focus on composability and context-awareness.",
      whoItsFor:
        "AI developers and engineers building applications that leverage large language models like GPT-4, Claude, or other LLMs.",
      prosAndCons: {
        pros: [
          "Simplifies integration with various LLM providers",
          "Provides tools for context management and retrieval",
          "Enables complex chains of LLM operations",
          "Supports both TypeScript and Python",
          "Active development and community",
        ],
        cons: [
          "Rapidly evolving API that can break backward compatibility",
          "Documentation sometimes lags behind development",
          "Can add complexity for simple use cases",
        ],
      },
      whyItMatters:
        "LangChain addresses the challenge of building complex, context-aware applications with LLMs by providing standardized interfaces and composable components, making it easier to create sophisticated AI applications.",
    },
    relatedRepos: [],
  },
  {
    id: "5",
    name: "shadcn-ui",
    owner: {
      login: "shadcn",
      avatar_url: "/abstract-geometric-logo.png",
    },
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    aiSummary: "Accessible and customizable React components that you can copy and paste into your apps.",
    language: "TypeScript",
    stars: 45000,
    forks: 2800,
    updated_at: "2023-04-29T14:20:00Z",
    topics: ["react", "components", "ui", "tailwindcss", "radix-ui", "design-system"],
    fullDescription: `
      shadcn/ui is a collection of re-usable components that you can copy and paste into your apps.
      
      - Accessible: All components follow WAI-ARIA guidelines and implement keyboard interactions.
      - Customizable: Fully customize the look and feel of every component.
      - Open Source: Free to use for personal and commercial projects.
      - Not a UI Library: This is not a component library. It's a collection of re-usable components that you can copy and paste into your apps.
      
      What makes this different is that the components are built using Radix UI primitives and styled with Tailwind CSS. Radix UI provides the unstyled, accessible components, and Tailwind CSS provides the styling utility classes.
      
      You have complete control over the implementation. You can customize the components to your needs, modify the styles, add or remove features, and even choose a different styling solution if you want.
    `,
    aiAnalysis: {
      whatItIs:
        "shadcn/ui is a collection of accessible, customizable React components built with Radix UI primitives and styled with Tailwind CSS.",
      whoItsFor:
        "React developers who want high-quality, accessible UI components that they can fully customize and own in their codebase.",
      prosAndCons: {
        pros: [
          "Copy-paste approach gives you full control over the code",
          "Built on accessible Radix UI primitives",
          "Beautifully designed with Tailwind CSS",
          "No dependencies to manage or update",
          "Fully customizable to match your brand",
        ],
        cons: [
          "Not a traditional package, so no automatic updates",
          "Requires Tailwind CSS in your project",
          "May require more setup than a traditional UI library",
        ],
      },
      whyItMatters:
        "shadcn/ui represents a shift in how UI components are distributed, focusing on giving developers full ownership of the code rather than adding dependencies. This approach provides maximum flexibility and customization.",
    },
    relatedRepos: ["1", "2", "3"],
  },
]

export default function RepoPage({ params }: { params: { id: string } }) {
  const repo = mockRepos.find((r) => r.id === params.id)

  if (!repo) {
    notFound()
  }

  return <RepoSpotlight repo={repo} />
}
