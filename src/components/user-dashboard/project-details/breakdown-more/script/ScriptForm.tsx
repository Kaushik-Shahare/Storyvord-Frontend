// @ts-nocheck

import React from "react";
import RenderFormFields, { FormFieldConfig } from "@/components/form-component/RenderFormFields";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const fieldValueSchema = z.object({
  number: z.number().min(0, "Number must be non-negative."),
  "int/ext": z.string().min(1, "Int/Ext field cannot be empty."),
  set: z.string().min(1, "Set field cannot be empty."),
  "day/night": z.enum(["Day", "Night"]).optional(),
  "script-day": z.string().optional(),
  pages: z.string().regex(/^\d+(\.\d+)?$/, "Pages must be a valid number."),
  description: z.string().optional(),
  characters: z.string().min(1, "Characters field cannot be empty."),
});
export type FormType = z.infer<typeof fieldValueSchema>;
const formFields: FormFieldConfig<FormType>[] = [
  {
    name: "number",
    type: "number",
    label: "Number",
  },
  {
    name: "int/ext",
    type: "text",
    label: "Int/Ext",
  },
  {
    name: "set",
    type: "text",
    label: "Set",
  },
  {
    name: "day/night",
    type: "text",
    label: "Day/Night",
  },
  {
    name: "script-day",
    type: "text",
    label: "Script",
  },
  {
    name: "pages",
    type: "text",
    label: "Pages",
  },
  {
    name: "description",
    type: "text",
    label: "Description",
  },
  {
    name: "characters",
    type: "text",
    label: "Characters",
  },
];

const ScriptForm = () => {
  const form = useForm({
    resolver: zodResolver(fieldValueSchema),
  });
  const onSubmit = () => {};
  return (
    <div className="bg-blue-50 rounded-md border-l-4 border-blue-300 p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 justify-center flex flex-col"
        >
          <div className=" flex gap-2">
            <RenderFormFields form={form} formFields={formFields.slice(0, 6)} />
          </div>
          <RenderFormFields form={form} formFields={formFields.slice(6, 8)} />
        </form>
      </Form>
    </div>
  );
};

export default ScriptForm;
