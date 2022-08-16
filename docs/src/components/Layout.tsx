import clsx from "clsx"
import Link from "next/link"

import { Hero } from "@/components/Hero"
import { Navigation } from "@/components/Navigation"
import { Prose } from "@/components/Prose"
import { useNav } from "@/lib/nav"

import Header from "./Header"

export function Layout({ children, title, tableOfContents }) {
  const nav = useNav(tableOfContents)

  function isActive(section) {
    if (section.id === nav.currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <div className={""}>
      <Header />

      {/* {isHomePage && <Hero />} */}

      <div className="relative flex justify-center mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
            <div className="absolute bottom-0 right-0 hidden w-px h-12 top-16 bg-gradient-to-t from-slate-800 dark:block" />
            <div className="absolute bottom-0 right-0 hidden w-px top-28 bg-slate-800 dark:block" />
            <Navigation className="w-64 pr-8 xl:w-72 xl:pr-16" />
          </div>
        </div>
        <div className="flex-auto max-w-2xl min-w-0 px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || nav.section) && (
              <header className="space-y-1 mb-9">
                {nav.section && (
                  <p className="text-sm font-medium text-green-500 font-display">
                    {nav.section.title}
                  </p>
                )}
                {title && (
                  <h1 className="text-3xl tracking-tight font-display text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="flex pt-6 mt-12 border-t border-slate-200 dark:border-slate-800">
            {nav.previousPage && (
              <div>
                <dt className="text-sm font-medium font-display text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nav.previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span>{" "}
                    {nav.previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nav.nextPage && (
              <div className="ml-auto text-right">
                <dt className="text-sm font-medium font-display text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nav.nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nav.nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="text-sm font-medium font-display text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? "text-green-500"
                              : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="pl-5 mt-2 space-y-3 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? "text-green-500"
                                    : "hover:text-slate-600 dark:hover:text-slate-300"
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
