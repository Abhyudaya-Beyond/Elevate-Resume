import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  /* Base: Consciousness-aware transitions (150ms perceptible, 250ms smooth) */
  "inline-flex scale-100 items-center justify-center rounded-base text-sm font-medium ring-offset-background transition-all duration-perceptible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Primary - Deep Slate Blue (Prefrontal Trust) */
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md transition-shadow duration-perceptible",
        
        /* Secondary - Light gray (De-emphasized) */
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        
        /* Accent - Warm Gold (Dopamine Trigger) */
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg transition-shadow duration-perceptible font-semibold",
        
        /* Danger - Coral (Threat Alert) */
        danger: "bg-error text-error-foreground hover:bg-error/90",
        
        /* Success - Sage Green (Verified Completion) */
        success: "bg-success text-success-foreground hover:bg-success/90",
        
        /* Outline - Bordered (Secondary Action) */
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        
        /* Ghost - Transparent (Tertiary Action) */
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        
        /* Link - Text only (Minimal) */
        link: "text-primary underline-offset-4 hover:underline p-0",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-9",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", className: "h-auto px-0" },
      { variant: "link", size: "md", className: "h-auto px-0" },
      { variant: "link", size: "lg", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
