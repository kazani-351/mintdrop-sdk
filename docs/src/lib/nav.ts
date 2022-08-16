import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

export const navigation = [
  {
    title: "Getting Started",
    links: [
      { title: "Installation", href: "/" }
      // { title: "Core concepts", href: "/docs/concepts" },
      // { title: "Best Practices", href: "/docs/concepts" }
    ]
  },
  {
    title: "Embed",
    links: [{ title: "Widget", href: "/widget" }]
  },
  // {
  //   title: "Components",
  //   links: [
  //     { title: "GroupCheck", href: "/sdk/GroupCheck" },
  //     { title: "MintButton", href: "/sdk/MintButton" },
  //     { title: "Widget", href: "/sdk/Widget" }
  //   ]
  // },
  {
    title: "Hooks",
    links: [
      { title: "useBlockBeat", href: "/sdk/useBlockBeat" },
      { title: "useCounts", href: "/sdk/useCounts" },
      { title: "useHeartbeat", href: "/sdk/useHeartbeat" },
      { title: "useTiming", href: "/sdk/useTiming" }
    ]
  }
  // {
  //   title: "Smart Contracts",
  //   links: [{ title: "Overview", href: "/contracts" }]
  // }
]

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function useNav(tableOfContents) {
  const router = useRouter()
  // let isHomePage = router.pathname === "/"
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  return {
    allLinks,
    previousPage,
    nextPage,
    section,
    currentSection
  }
}
