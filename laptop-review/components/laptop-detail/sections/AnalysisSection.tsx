import React from "react";
import Image from "next/image";

interface AnalysisSectionProps {
  title: string;
  score?: number;
  image?: string;
  children: React.ReactNode;
}

export default function AnalysisSection({ title, score, image, children }: AnalysisSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        {score && (
          <div className="text-white text-xs px-2.5 py-1 rounded-full font-bold bg-blue-600 dark:bg-blue-500">
            {score.toFixed(1)}/10
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-300">
          {children}
        </div>
        
        {image && (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={`${title} illustration`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}