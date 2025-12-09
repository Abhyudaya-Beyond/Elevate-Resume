/**
 * Register Page - Consciousness-First Design
 * 
 * Neurobiological Design Principles:
 * - Centered card = focused prefrontal attention (no distractions)
 * - Gold button = dopamine trigger (approach motivation)
 * - Cream background = reduced cognitive load (calming)
 * - White card = clean, organized (prefrontal feels order)
 * - Error states = Coral threat (high alert, requires attention)
 * - Motion: 200ms fade-in (natural appearance)
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { registerSchema } from "@elevate/dto";
import { usePasswordToggle } from "@elevate/hooks";
import {
  Alert,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@elevate/ui";
import { cn } from "@elevate/utils";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { z } from "zod";

import { Logo } from "@/client/components/logo";
import { useRegister } from "@/client/services/auth";
import { useFeatureFlags } from "@/client/services/feature";

type FormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { flags } = useFeatureFlags();
  const { register, loading } = useRegister();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      locale: "en-US",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data);

      void navigate("/auth/verify-email");
    } catch {
      form.reset();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
      className="w-full max-w-[400px] mx-auto"
    >
      <Helmet>
        <title>
          {t`Create a new account`} - {t`Elevate`}
        </title>
      </Helmet>

      {/* Logo - Centered, Prefrontal Attention */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="flex justify-center mb-gutter"
      >
        <Logo size={48} />
      </motion.div>

      {/* Heading - Clear Hierarchy */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.2 }}
        className="text-center mb-gutter-sm"
      >
        <h2 className="text-2xl font-bold tracking-tight text-primary mb-gutter-xs">
          {t`Create your Elevate account`}
        </h2>
        <p className="text-base text-foreground/70">
          {t`Start building your story today.`}
        </p>
      </motion.div>

      {/* Form Card - White, Clean, Organized */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="bg-background border border-border rounded-base p-6 sm:p-gutter shadow-sm"
      >
        {flags.isSignupsDisabled && (
          <Alert variant="error" className="mb-gutter-sm">
            <AlertTitle>{t`Signups are currently disabled by the administrator.`}</AlertTitle>
          </Alert>
        )}

        <div className={cn(flags.isSignupsDisabled && "pointer-events-none select-none blur-sm")}>
          <Form {...form}>
            <form
              ref={formRef}
              className="flex flex-col gap-y-gutter-sm"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t`Full name`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        hasError={!!form.formState.errors.name}
                        className={cn(
                          "h-11 transition-all duration-perceptible",
                          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
                          "hover:bg-secondary/10"
                        )}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t`Username`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        hasError={!!form.formState.errors.username}
                        className={cn(
                          "lowercase h-11 transition-all duration-perceptible",
                          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
                          "hover:bg-secondary/10"
                        )}
                        placeholder="john.doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t`Email`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        hasError={!!form.formState.errors.email}
                        className={cn(
                          "lowercase h-11 transition-all duration-perceptible",
                          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
                          "hover:bg-secondary/10"
                        )}
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t`Password`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        hasError={!!form.formState.errors.password}
                        className={cn(
                          "h-11 transition-all duration-perceptible",
                          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
                          "hover:bg-secondary/10"
                        )}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-foreground/60">
                      <Trans>
                        Hold <code className="text-xs font-bold">Ctrl</code> to display your password
                        temporarily.
                      </Trans>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button - Gold, Full-width, Dopamine Trigger */}
              <Button
                type="submit"
                disabled={loading}
                variant="accent"
                size="lg"
                className="w-full h-11 mt-gutter-sm font-semibold transition-all duration-perceptible"
              >
                {loading ? (
                  <span className="flex items-center gap-x-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                    {t`Creating account...`}
                  </span>
                ) : (
                  t`Create account`
                )}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>

      {/* Bottom Link - Centered, Secondary Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        className="text-center mt-gutter"
      >
        <p className="text-sm text-foreground/70">
          <span>{t`Already have an account?`} </span>
          <Button
            asChild
            variant="link"
            className="h-auto p-0 text-accent hover:text-accent/80 hover:underline font-medium"
          >
            <Link to="/auth/login">
              {t`Sign in`} <ArrowRightIcon className="ml-1 inline" size={14} />
            </Link>
          </Button>
        </p>
      </motion.div>
    </motion.div>
  );
};
