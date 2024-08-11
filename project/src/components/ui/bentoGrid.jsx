import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import AnimatedShinyText from './animatedText';
import { useNavigate } from 'react-router-dom';


const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        `grid w-full h-[400px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 `,
        className
      )}
    >
      {children}
    </div>
  );
};

BentoGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
  }) => {
  const navigate = useNavigate();

  const linkHandler = (ref) => {
    navigate(ref);
  }
 return (
    
    <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col  justify-between overflow-hidden rounded-xl",
      // light styles
      " [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <div onClick={()=>linkHandler(href)}>
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>ENTER</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
        </div>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
  )
};

BentoCard.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  background: PropTypes.node,
  Icon: PropTypes.elementType.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
};

export { BentoCard, BentoGrid };