import React, { useState } from "react";
import Image from "next/image";
import { Youtube, ChevronDown } from "lucide-react";
import SpecItem from "@/components/common/spec-item";
import { Cpu, CpuIcon as Gpu, MemoryStickIcon as Memory, HardDrive, Monitor, Battery } from "lucide-react";

type OverviewProps = {
  laptop: any;
  detailed?: boolean;
};

export default function Overview({ laptop, detailed = false }: OverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {!detailed ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 flex items-center justify-center shadow">
            <div className="relative w-full h-[350px] md:h-[400px]">
              <Image
                src={laptop.image || "/placeholder.svg"}
                alt={`Image of ${laptop.name}`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">{laptop.name}</h1>
            
            {laptop.reviewUrl && (
              <a
                href={laptop.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-600 mb-5 hover:underline w-fit"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Watch Video Review
              </a>
            )}
            
            <div className="mb-5">
              {laptop.description ? (
                <p className="text-gray-700 leading-relaxed">{laptop.description}</p>
              ) : (
                <p className="text-gray-500 italic">No description.</p>
              )}
              
              {laptop.longDescription && (
                <div className="mt-3">
                  {!isExpanded ? (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Read More <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <p className="text-gray-700 leading-relaxed mt-2">{laptop.longDescription}</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="mb-5">
              <div className="flex items-baseline mb-1">
                {laptop.price ? (
                  <span className="text-3xl font-bold text-gray-900">{laptop.price}</span>
                ) : (
                  <span className="text-xl text-gray-500">N/A</span>
                )}
                {laptop.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">{laptop.originalPrice}</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <SpecItem
                icon={<Cpu className="w-5 h-5 text-gray-600" />}
                label="Processor"
                value={laptop.specs.cpu}
              />
              <SpecItem
                icon={<Gpu className="w-5 h-5 text-gray-600" />}
                label="Graphics"
                value={laptop.specs.gpu}
              />
              <SpecItem
                icon={<Memory className="w-5 h-5 text-gray-600" />}
                label="Memory"
                value={laptop.specs.ram}
              />
              <SpecItem
                icon={<HardDrive className="w-5 h-5 text-gray-600" />}
                label="Storage"
                value={laptop.specs.storage}
              />
              <SpecItem
                icon={<Monitor className="w-5 h-5 text-gray-600" />}
                label="Display"
                value={laptop.specs.display}
              />
              <SpecItem
                icon={<Battery className="w-5 h-5 text-gray-600" />}
                label="Battery"
                value={laptop.specs.battery}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Chi tiết có thể được thêm vào cho chế độ xem chi tiết */}
        </div>
      )}
    </div>
  );
}