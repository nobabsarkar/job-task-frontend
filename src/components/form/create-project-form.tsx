"use client";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Link,
  MapPin,
  TextIcon,
  TextWrapIcon,
  TicketsPlaneIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateProjectValidationSchema } from "@/validation/project.validation";
import { useCreateProject } from "@/hooks/project.hook";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

const CreateProjectForm = () => {
  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm({
    defaultValues: {
      projectName: "Nobab",
      repoUrl: "https://github.com/nobabsarkar",
      liveLink: "https://my-portfolio-five-zeta-19.vercel.app/",
      description: "this is description",
    },

    validators: {
      onSubmit: CreateProjectValidationSchema,
    },

    onSubmit: async ({ value }) => {
      const projectData = {
        projectName: value.projectName,
        repoUrl: value.repoUrl,
        liveLink: value.liveLink,
        description: value.description,
      };

      createProject(projectData, {
        onSuccess: () => {
          toast.add({
            title: "Project Created Successfully",
            description: "Well Done",
            type: "success",
          });
        },

        onError: (err) => {
          const error = err as {
            message?: string;
            data?: {
              message?: string;
              error?: string;
            };
            response?: {
              _data?: {
                message?: string;
                error?: string;
              };
            };
          };

          const errorMessage =
            error.data?.message ||
            error.data?.error ||
            error.response?._data?.message ||
            error.response?._data?.error ||
            error.message ||
            "Something went wrong. Please try again";

          toast.add({
            title: "Failed to Create Project",
            description: errorMessage,
            type: "error",
          });
        },

        // onError: (err) => {
        //   toast.add({
        //     title: "Failure Create Project",
        //     description:
        //       err?.message || "Something went wrong. Please try again",
        //     type: "error",
        //   });
        // },
      });
    },
  });

  return (
    <div className="min-h-full w-full px-4 py-8 sm:px-6 lg:px-8 ">
      <div className="mx-auto w-full max-w-3xl">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl  bg-card shadow-xl">
          {/* Card Header */}
          <div className=" bg-muted/30 px-6 py-6 sm:px-8">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="size-5 text-primary" />
              </div>

              <div>
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Create Project
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Create your personal project.
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-6 py-7 sm:px-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              noValidate
            >
              <FieldGroup>
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Title */}
                  <form.Field name="projectName">
                    {(field) => {
                      // const isInvalid =
                      //   field.state.meta.isTouched && !field.state.meta.isValid;
                      const isInvalid =
                        !field.state.meta.isValid &&
                        (field.state.meta.isTouched ||
                          form.state.submissionAttempts > 0);

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Create Project
                          </FieldLabel>

                          <div className="relative">
                            <TicketsPlaneIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="text"
                              placeholder="Project Name"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              className="h-10 pl-9"
                            />
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                  {/* Description */}
                  <form.Field name="repoUrl">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Repo Url</FieldLabel>

                          <div className="relative">
                            <TextIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="text"
                              placeholder="RepoUrl"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              className="h-10 pl-9"
                            />
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                  {/* Location */}
                  <form.Field name="liveLink">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Live Link
                          </FieldLabel>

                          <div className="relative">
                            {/* <LocationEdit className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /> */}
                            <Link className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id={field.name}
                              name={field.name}
                              type="text"
                              placeholder="Live Link"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              className="h-10 pl-9"
                            />
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                  {/* Descriptiion */}

                  <form.Field name="description">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Description
                          </FieldLabel>

                          <div className="relative">
                            <TextWrapIcon className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />

                            <Textarea
                              id={field.name}
                              name={field.name}
                              placeholder="Description..."
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e: any) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              className="min-h-28 resize-y pl-9 pt-2.5"
                            />
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </div>
              </FieldGroup>

              {/* Footer */}
              <div className="mt-8 flex flex-col-reverse gap-3  pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>

                <Button type="submit" size="lg" className="cursor-pointer">
                  {isPending ? (
                    <>
                      <Spinner /> Creating Project...
                    </>
                  ) : (
                    " Create Project"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
