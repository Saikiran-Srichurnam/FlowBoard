import { forwardRef } from "react";
import {cn} from "../../../utils/cn";
import { buttonVarients } from "./buttonVarients";

const Button = forwardRef((props, ref) => {
  const {
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    type = "button",
    ...rest
  } = props
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        buttonVarients.base,
        buttonVarients.variants[variant],
        buttonVarients.sizes[size],
        className
      )}
      {...rest}
    >
      {leftIcon}
      {loading ? "Loading..." : children}
      {rightIcon}
    </button>
  )
})

Button.displayName = "Button";

export default Button