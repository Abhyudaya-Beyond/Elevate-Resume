import type { ResumeDto } from "@elevate/dto";
import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { useResumeStore } from "@/client/stores/resume";

/**
 * Builder Page
 * 
 * The actual editor UI is rendered in BuilderLayout.
 * This component just handles the loader.
 */
export const BuilderPage = () => {
  // The layout handles all rendering
  return null;
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = params.id!;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { id }],
      queryFn: () => findResumeById({ id }),
    });

    useResumeStore.setState({ resume });
    useResumeStore.temporal.getState().clear();

    return resume;
  } catch {
    return redirect("/dashboard");
  }
};
