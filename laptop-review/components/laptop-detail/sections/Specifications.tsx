// laptop-review/components/laptop-detail/sections/Specifications.tsx
import React from "react";

type SpecificationsProps = {
  laptop: any;
};

export default function Specifications({ laptop }: SpecificationsProps) {
  return (
    <div className="pt-4">
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">System</h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Processor</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.cpu?.name || laptop.specs.cpu}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Graphics</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.gpu?.name || laptop.specs.gpu}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Memory</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.ram?.capacity || laptop.specs.ram}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Storage</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.storage?.capacity || laptop.specs.storage}</td>
              </tr>
              <tr>
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Operating System</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.specs.operatingSystem || "Windows 11 Home"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">Display & Battery</h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Display</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">
                  {laptop.detailedSpecs?.display?.size} {laptop.detailedSpecs?.display?.resolution} {laptop.detailedSpecs?.display?.type} Anti-Glare
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Brightness</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.display?.brightness}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Color Gamut</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.display?.colorGamut?.sRGB}% sRGB</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Battery</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.battery?.capacity} Li-Polymer</td>
              </tr>
              <tr>
                <td className="py-2 pr-2 text-gray-500 dark:text-gray-400">Charging</td>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{laptop.detailedSpecs?.battery?.chargerWattage} USB-C PD 3.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}