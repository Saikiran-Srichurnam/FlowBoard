export const buttonVarients = {
    
    // shared styles
    base:`
        inline-flex
        items-center
        justify-center
        rounded-lg
        font-medium
        transition-all
        duration-200
        focus-visible:outline-none
        disabled:pointer-events-none
        disabled:opacity-50
        gap-2
        whitespace-nowrap
        cursor-pointer
    `,

    // visual styles
    variants: {
        primary: `
            bg-primary
            text-white
            shadow-sm
            hover:bg-primary-hover

            active:scale-[0.98]
            focus-visible:ring-2
            focus-visible:ring-primary/30`,
        secondary: `
            bg-surface
            text-heading
            border 
            border-border
            shadow-sm
            hover:bg-slate-100
            active:scale-[0.98]
            focus-visible:ring-2
            focus-visible:ring-primary/30
        `,
        outline: `
            bg-transparent
            border
            border-primary
            text-primary
            shadow-sm

            hover:bg-primary/10
            active:scale-[0.98]
            focus-visible:ring-2
            focus-visible:ring-primary/30
        `,
        ghost: `
            bg-transparent
            text-heading

            hover:bg-slate-100
            active:scale-[0.98]
            focus-visible:ring-2
            focus-visible:ring-primary/30
        `,
        danger: `
            bg-danger
            text-white
            hover:bg-red-600

            active:scale-[0.98]
            focus-visible:ring-2
            focus-visible:ring-danger/30
        `,
    },

    // Dimensions
    sizes: {
        sm: `h-9 px-3 text-sm`,
        md: `h-10 px-4 text-sm`,
        lg: `h-11 px-6 text-base`,
        icon: `h-10 w-10 text-base`
    }
}