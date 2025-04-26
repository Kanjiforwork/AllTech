import React from "react";
import Header from "@/components/common/header";
import TabPanel from "@/components/common/tab-panel";
import Overview from "./sections/Overview";
import Specifications from "./sections/Specifications";
import Performance from "./sections/Performance";
import ProsCons from "./sections/ProsCons";
import DetailedAnalysis from "./sections/DetailedAnalysis";
import ComparisonTable from "./comparison-table";
import ComparisonButton from "@/components/comparison/ComparisonButton";

type LaptopDetailPageProps = {
  laptop: any;
  similarLaptops?: any[];
};

export default function LaptopDetailPage({ laptop, similarLaptops = [] }: LaptopDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Overview Section */}
        <Overview laptop={laptop} />
        
        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
          <TabPanel>
            <TabPanel.Tab label="Specifications">
              <Specifications laptop={laptop} />
            </TabPanel.Tab>
            
            {laptop.benchmarks ? (
              <TabPanel.Tab label="">
                <Performance laptop={laptop} />
              </TabPanel.Tab>
            ) : null}
            
            {similarLaptops && similarLaptops.length > 0 ? (
              <TabPanel.Tab label="Comparisons">
                <div className="pt-4">
                  <ComparisonTable laptops={similarLaptops} currentLaptopId={laptop.id} />
                </div>
              </TabPanel.Tab>
            ) : null}
          </TabPanel>
        </div>
        
        {/* Pros and Cons Section */}
        <ProsCons laptop={laptop} />
        
        {/* Detailed Analysis Section */}
        <DetailedAnalysis laptop={laptop} />
      </main>

      {/* Floating Comparison Button */}
      <ComparisonButton currentLaptopId={laptop.id} />
    </div>
  );
}