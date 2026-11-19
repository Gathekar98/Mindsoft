"use client";

import type { Post, Project } from "@prisma/client";
import { ActionForm } from "./ActionForm";
import { TextArea, TextField } from "./Fields";
import { savePost, saveProject } from "@/app/admin/actions/content";

const mdHint = "Markdown supported: ## Heading, **bold**, - list, [link](https://…)";
const imgHint = "Optional. A path like /images/team-office.jpg or an https:// image URL.";

export function PostForm({ post }: { post?: Post }) {
  return (
    <ActionForm action={savePost} submitLabel={post ? "Save changes" : "Create draft"}>
      {(err, val) => {
        const d = (k: keyof Post & string, f?: string | null) => val[k] ?? f ?? "";
        return (
          <>
            {post && <input type="hidden" name="id" value={post.id} />}
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="title" label="Title" defaultValue={d("title", post?.title)} error={err.title} />
              <TextField name="slug" label="URL slug" defaultValue={d("slug", post?.slug)} error={err.slug} hint="e.g. website-checklist → /blog/website-checklist" />
              <TextField name="category" label="Category" defaultValue={d("category", post?.category)} error={err.category} hint="e.g. Websites, Web apps, Automation" />
              <TextField name="coverImage" label="Cover image" required={false} defaultValue={d("coverImage", post?.coverImage)} error={err.coverImage} hint={imgHint} />
            </div>
            <TextArea name="excerpt" label="Excerpt" rows={2} defaultValue={d("excerpt", post?.excerpt)} error={err.excerpt} hint="One or two sentences shown on the blog list and in search results." />
            <TextArea name="body" label="Article" rows={18} mono defaultValue={d("body", post?.body)} error={err.body} hint={mdHint} />
          </>
        );
      }}
    </ActionForm>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <ActionForm action={saveProject} submitLabel={project ? "Save changes" : "Create draft"}>
      {(err, val) => {
        const d = (k: string, f?: string | null) => val[k] ?? f ?? "";
        return (
          <>
            {project && <input type="hidden" name="id" value={project.id} />}
            <p className="rounded-xl bg-sun-soft px-4 py-3 text-sm text-[#8A5A00]">Only publish real projects. Name the client only with their written permission.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="title" label="Project title" defaultValue={d("title", project?.title)} error={err.title} />
              <TextField name="slug" label="URL slug" defaultValue={d("slug", project?.slug)} error={err.slug} />
              <TextField name="client" label="Client name" required={false} defaultValue={d("client", project?.client)} error={err.client} />
              <TextField name="industry" label="Industry" defaultValue={d("industry", project?.industry)} error={err.industry} />
              <TextField name="services" label="Services" defaultValue={d("services", project?.services.join(", "))} error={err.services} hint="Comma separated" />
              <TextField name="techStack" label="Technology" defaultValue={d("techStack", project?.techStack.join(", "))} error={err.techStack} hint="Comma separated" />
              <TextField name="coverImage" label="Cover image" required={false} defaultValue={d("coverImage", project?.coverImage)} error={err.coverImage} hint={imgHint} />
              <TextField name="liveUrl" label="Live URL" required={false} defaultValue={d("liveUrl", project?.liveUrl)} error={err.liveUrl} />
            </div>
            <TextArea name="summary" label="Summary" rows={2} defaultValue={d("summary", project?.summary)} error={err.summary} />
            <TextArea name="challenge" label="The challenge" rows={6} mono defaultValue={d("challenge", project?.challenge)} error={err.challenge} hint={mdHint} />
            <TextArea name="solution" label="Our solution" rows={6} mono defaultValue={d("solution", project?.solution)} error={err.solution} hint={mdHint} />
            <TextArea name="results" label="Results" rows={5} mono defaultValue={d("results", project?.results)} error={err.results} hint="Only include results you can verify." />
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="featured" defaultChecked={val.featured ? val.featured === "on" : project?.featured} className="h-4 w-4 accent-ocean" />
              Feature this project at the top of the Work page
            </label>
          </>
        );
      }}
    </ActionForm>
  );
}
