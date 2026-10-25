"use client";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  DollarSignIcon,
  LocationEdit,
  MapPin,
  TextIcon,
  TicketsPlaneIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Spinner } from "../ui/spinner";

const CreateProjectForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
    },

    // validators: {
    //   onSubmit: complainSchema,
    // },

    onSubmit: async ({ value }) => {
      const complainData = {
        title: value.title,
        description: value.description,
        location: value.location,
        price: Number(value.price),
      };
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
                  <form.Field name="title">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Complain Title
                          </FieldLabel>

                          <div className="relative">
                            <TicketsPlaneIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="text"
                              placeholder="Title"
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
                            <TextIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="text"
                              placeholder="Description"
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
                  <form.Field name="location">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Location</FieldLabel>

                          <div className="relative">
                            <LocationEdit className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="text"
                              placeholder="Location"
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

                  {/* Price */}
                  <form.Field name="price">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Price</FieldLabel>

                          <div className="relative">
                            <DollarSignIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="number"
                              min="0"
                              placeholder="Price"
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
                  Submit Project
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
