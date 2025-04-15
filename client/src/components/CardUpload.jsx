"use client";
import { animate, motion } from "motion/react";
import React, { useEffect } from "react";
import { cn } from "../../lib/utils";
import { GoCopilot } from "react-icons/go";
import UploadComponent from "./UploadComponent";



export function CardUpload() {
  return (
    <Card>
     
        
        
      
      <CardTitle>Upload CSV file</CardTitle>
      <CardDescription>
        Upload a csv file
      </CardDescription>
      <UploadComponent/>
    </Card>
  );
}




export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className
}) => {
  return (
    <h3
      className={cn("text-lg font-semibold text-gray-800 dark:text-white py-2", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
        className
      )}>
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true
}) => {
  return (
    <div
      className={cn("h-[15rem] md:h-[20rem] rounded-xl z-40", className, showGradient &&
        "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]")}>
      {children}
    </div>
  );
};

const Container = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}>
      {children}
    </div>
  );
};

