import * as React from "react";

import Head from "next/head";
import { Container } from "../ui/container";
import { Breadcrumb, BreadcrumbItem } from "~/components/ui/breadcrumb";
import { makeBreadcrumbJsonLd } from "~/lib/jsonld-generator";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backButton?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  backButton,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <>
      <Head>
        {breadcrumbs ? (
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(makeBreadcrumbJsonLd(breadcrumbs)),
            }}
            type="application/ld+json"
          />
        ) : null}
      </Head>

      <header className="px-4 pt-4">
        <Container>
          <div>
            {backButton}
            {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
          </div>
          <div className="mt-4 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="flex items-center text-md text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                {actions}
              </div>
            )}
          </div>
        </Container>
      </header>
    </>
  );
}
