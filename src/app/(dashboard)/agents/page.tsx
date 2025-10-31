import { auth } from "@/lib/auth";
import AgentsListHeader from "@/modules/agents/ui/components/agent-list-headers";
import {
  AgentsView,
  AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const querryClient = getQueryClient();
  void querryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  );
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(querryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <AgentsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
