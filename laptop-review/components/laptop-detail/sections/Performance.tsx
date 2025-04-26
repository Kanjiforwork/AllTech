// laptop-review/components/laptop-detail/sections/Performance.tsx
import React from "react";
import RatingBar from "@/components/common/rating-bar";

type PerformanceProps = {
  laptop: any;
};

export default function Performance({ laptop }: PerformanceProps) {
  if (!laptop.benchmarks) return null;

  // Constants for benchmarks max values
  const MAX_GEEKBENCH_SINGLE = 2800;
  const MAX_GEEKBENCH_MULTI = 15000;
  const MAX_CINEBENCH_SINGLE = 1800;
  const MAX_CINEBENCH_MULTI = 15000;

  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
      <div>
        <h3 className="text-base font-semibold mb-3 text-gray-800">Performance Ratings</h3>
        {laptop.benchmarks.gaming !== undefined && (
          <RatingBar score={laptop.benchmarks.gaming} label="Gaming" />
        )}
        {laptop.benchmarks.productivity !== undefined && (
          <RatingBar score={laptop.benchmarks.productivity} label="Productivity" />
        )}
        {laptop.benchmarks.content !== undefined && (
          <RatingBar score={laptop.benchmarks.content} label="Content Creation" />
        )}
        {laptop.benchmarks.overall !== undefined && (
          <RatingBar score={laptop.benchmarks.overall} label="Overall Performance" />
        )}
      </div>
      
      <div>
        <h3 className="text-base font-semibold mb-3 text-gray-800">Hardware Ratings</h3>
        {laptop.benchmarks.display !== undefined && (
          <RatingBar score={laptop.benchmarks.display} label="Display Quality" />
        )}
        {laptop.benchmarks.battery !== undefined && (
          <RatingBar score={laptop.benchmarks.battery} label="Battery Life" />
        )}
        {laptop.benchmarks.build !== undefined && (
          <RatingBar score={laptop.benchmarks.build} label="Build Quality" />
        )}
        {laptop.benchmarks.value !== undefined && (
          <RatingBar score={laptop.benchmarks.value} label="Value for Money" />
        )}
      </div>
      
      <div className="md:col-span-2 mt-6">
        <h3 className="text-base font-semibold mb-4 text-gray-800">Benchmark Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* CPU Benchmarks */}
          <div>
            <h4 className="font-medium mb-3">CPU Benchmarks</h4>
            
            {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Single && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Geekbench 6 (Single)</span>
                  <span className="font-medium">{laptop.detailedSpecs.cpu.benchmarks.geekbench6Single}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(laptop.detailedSpecs.cpu.benchmarks.geekbench6Single / MAX_GEEKBENCH_SINGLE) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Multi && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Geekbench 6 (Multi)</span>
                  <span className="font-medium">{laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi / MAX_GEEKBENCH_MULTI) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {laptop.detailedSpecs?.cpu?.benchmarks?.cinebenchR23Single && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Cinebench R23 (Single)</span>
                  <span className="font-medium">{laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Single}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Single / MAX_CINEBENCH_SINGLE) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {laptop.detailedSpecs?.cpu?.benchmarks?.cinebenchR23Multi && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Cinebench R23 (Multi)</span>
                  <span className="font-medium">{laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Multi}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(laptop.detailedSpecs.cpu.benchmarks.cinebenchR23Multi / MAX_CINEBENCH_MULTI) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* GPU Benchmarks */}
          <div>
            <h4 className="font-medium mb-3">GPU Benchmarks</h4>
            
            {laptop.detailedSpecs?.gpu?.benchmarks?.wildlifeExtreme && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">3DMark Wildlife Extreme</span>
                  <span className="font-medium">{laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(laptop.detailedSpecs.gpu.benchmarks.wildlifeExtreme / 8000) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">3DMark Time Spy</span>
                <span className="font-medium">5876</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: "58%" }}
                ></div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Geekbench Compute</span>
                <span className="font-medium">21345</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: "71%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {laptop.benchmarks.cinebenchR23Multi && (
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-xs text-gray-500">Cine R23 Multi</p>
              <p className="text-lg font-semibold">{laptop.benchmarks.cinebenchR23Multi}</p>
            </div>
          )}
          {laptop.benchmarks.timeSpy && (
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-xs text-gray-500">Time Spy</p>
              <p className="text-lg font-semibold">{laptop.benchmarks.timeSpy}</p>
            </div>
          )}
          {laptop.benchmarks.pcMark10 && (
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-xs text-gray-500">PCMark 10</p>
              <p className="text-lg font-semibold">{laptop.benchmarks.pcMark10}</p>
            </div>
          )}
          {laptop.detailedSpecs?.cpu?.benchmarks?.geekbench6Multi && (
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-xs text-gray-500">GB6 Multi</p>
              <p className="text-lg font-semibold">{laptop.detailedSpecs.cpu.benchmarks.geekbench6Multi}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}