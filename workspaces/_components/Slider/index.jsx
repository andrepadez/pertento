import { Slider as ShadSlider } from 'shadcn/slider';
import { cn } from 'helpers/cn';
import './slider.css';

export const Slider = ({ className, disabled, small, ...props }) => {
  return (
    <ShadSlider
      disabled={disabled}
      className={cn('shad-slider', disabled && 'disabled', small && 'small', className)}
      {...props}
    />
  );
};
