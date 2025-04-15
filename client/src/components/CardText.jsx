"use client";
import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export function CardText() {
  const [formData, setFormData] = useState({
    subject: "Alfresco-2025 Chess Tournament",
    greeting: "Hello",
    body: "♟️ Join Our Chess Community for Match Updates! 🎉\n\nThank you for registering for the upcoming ALFRESCO '25 CHESS tournament!\n\nJoin our WhatsApp group to stay updated on fixtures and match schedules. Get real-time updates, connect with fellow players, and never miss a match.\n\n🔗 Join here: https://chat.whatsapp.com/HxyCOsTQUUfLZECZFIFvBP\n\nSee you at the board! ♟️🔥\n\n(Please ignore if already joined)",
    sender: "Satvik"
  });

  // Load saved template on component mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('emailTemplate');
    if (savedTemplate) {
      try {
        setFormData(JSON.parse(savedTemplate));
      } catch (e) {
        console.error("Error parsing saved template:", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Save template whenever it changes
  useEffect(() => {
    localStorage.setItem('emailTemplate', JSON.stringify(formData));
  }, [formData]);

  return (
    <Card>
      <div className="h-full overflow-y-auto px-2">
        <CardTitle>Email Template</CardTitle>
        <CardDescription className="mb-4">
          Customize the email that will be sent
        </CardDescription>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              From Name
            </label>
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Greeting (before name)
            </label>
            <input
              type="text"
              name="greeting"
              value={formData.greeting}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email Body
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="10"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

// Keep the existing component definitions
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