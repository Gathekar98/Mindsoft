"use client";

import type { Job } from "@prisma/client";
import { ActionForm } from "./ActionForm";
import { SelectField, TextArea, TextField } from "./Fields";
import { saveJob } from "@/app/admin/actions/careers";

export function JobForm({ job }: { job?: Job }) {
  const list = (v?: string[]) => (v ?? []).join("\n");
  return (
    <ActionForm action={saveJob} submitLabel={job ? "Save changes" : "Create draft"}>
      {(err, val) => {
        const d = (k: string, fallback?: string | null) => val[k] ?? fallback ?? "";
        return (
          <>
            {job && <input type="hidden" name="id" value={job.id} />}
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="title" label="Job title" defaultValue={d("title", job?.title)} error={err.title} />
              <TextField name="slug" label="URL slug" defaultValue={d("slug", job?.slug)} error={err.slug} hint="e.g. react-js-developer → /careers/react-js-developer" />
              <SelectField name="kind" label="Type" defaultValue={d("kind", job?.kind ?? "JOB")} options={[{ value: "JOB", label: "Job" }, { value: "INTERNSHIP", label: "Internship" }]} />
              <TextField name="department" label="Department" defaultValue={d("department", job?.department ?? "Engineering")} error={err.department} />
              <TextField name="location" label="Location" defaultValue={d("location", job?.location ?? "Remote · Pune, Maharashtra, India")} error={err.location} />
              <TextField name="employmentType" label="Employment type" defaultValue={d("employmentType", job?.employmentType ?? "Full-time")} error={err.employmentType} />
              <TextField name="experience" label="Experience" defaultValue={d("experience", job?.experience)} error={err.experience} />
              <TextField name="closesAt" label="Applications close" type="date" required={false} defaultValue={d("closesAt", job?.closesAt?.toISOString().slice(0, 10))} error={err.closesAt} />
            </div>
            <TextArea name="summary" label="Summary" rows={3} defaultValue={d("summary", job?.summary)} error={err.summary} hint="Shown on the careers list and at the top of the job page." />
            <div className="grid gap-4 lg:grid-cols-2">
              <TextArea name="responsibilities" label="Responsibilities" rows={7} defaultValue={d("responsibilities", list(job?.responsibilities))} hint="One per line" />
              <TextArea name="requirements" label="Required skills" rows={7} defaultValue={d("requirements", list(job?.requirements))} hint="One per line" />
              <TextArea name="niceToHave" label="Nice to have" rows={4} required={false} defaultValue={d("niceToHave", list(job?.niceToHave))} hint="One per line" />
              <TextArea name="qualifications" label="Qualifications" rows={4} required={false} defaultValue={d("qualifications", list(job?.qualifications))} hint="One per line" />
              <TextArea name="benefits" label="What we offer" rows={4} required={false} defaultValue={d("benefits", list(job?.benefits))} hint="One per line, include salary/stipend once confirmed" className="lg:col-span-2" />
            </div>
          </>
        );
      }}
    </ActionForm>
  );
}
