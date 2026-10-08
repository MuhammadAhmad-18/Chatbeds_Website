import { notFound } from "next/navigation";
import { IntegrationPage } from "@/components/IntegrationPage";
import { integrationPages, type IntegrationSlug } from "@/lib/integrations";
import { pageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return Object.keys(integrationPages).map((slug) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(integrationPages, slug)) notFound();
  const page = integrationPages[slug as IntegrationSlug];
  return pageMetadata(page.label, page.description, `/integrations/${slug}`);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(integrationPages, slug)) notFound();
  return <IntegrationPage slug={slug as IntegrationSlug} />;
}
