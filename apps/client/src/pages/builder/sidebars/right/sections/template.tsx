import { t } from "@lingui/macro";
import { AspectRatio } from "@elevate/ui";
import { cn, templatesList } from "@elevate/utils";
import { motion } from "framer-motion";
import { useState } from "react";

import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const TemplateSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const currentTemplate = useResumeStore((state) => state.resume.data?.metadata?.template ?? "modern");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (template: string) => {
    setImageErrors((prev) => new Set(prev).add(template));
  };

  return (
    <section id="template" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="template" size={18} name={t`Template`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Template`}</h2>
        </div>
      </header>

      <main className="grid grid-cols-2 gap-8 @lg/right:grid-cols-3 @2xl/right:grid-cols-4">
        {templatesList.map((template, index) => {
          const hasImageError = imageErrors.has(template);
          
          return (
            <AspectRatio key={template} ratio={1 / 1.4142}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: index * 0.1 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className={cn(
                  "relative cursor-pointer rounded-sm ring-primary transition-all hover:ring-2",
                  currentTemplate === template && "ring-2",
                )}
                onClick={() => {
                  setValue("metadata.template", template);
                }}
              >
                {!hasImageError ? (
                  <img 
                    src={`/templates/jpg/${template}.jpg`} 
                    alt={template} 
                    className="rounded-sm w-full h-full object-cover"
                    onError={() => handleImageError(template)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm border-2 border-dashed border-gray-300">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">📄</div>
                      <div className="text-sm font-bold text-gray-700 capitalize">{template}</div>
                      <div className="text-xs text-gray-500 mt-1">New Template</div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-background/80">
                  <p className="absolute inset-x-0 bottom-2 text-center font-bold capitalize text-primary">
                    {template}
                  </p>
                </div>
              </motion.div>
            </AspectRatio>
          );
        })}
      </main>
    </section>
  );
};
