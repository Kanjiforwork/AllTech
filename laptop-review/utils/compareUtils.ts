// laptop-review/utils/compareUtils.ts
export function compareSpecs(value1: any, value2: any, isHigherBetter = true): [boolean, boolean] {
    // Handle numeric values (with possible unit strings)
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      // Extract numbers from strings (e.g. "1.9 kg" -> 1.9)
      const num1 = parseFloat(value1)
      const num2 = parseFloat(value2)
      if (!isNaN(num1) && !isNaN(num2)) {
        if (isHigherBetter) {
          return [num1 > num2, num1 < num2]
        } else {
          return [num1 < num2, num1 > num2]
        }
      }
    }
  
    // Handle boolean values
    if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
      return [value1 && !value2, !value1 && value2]
    }
  
    // Handle string comparison
    if (value1 === value2) return [false, false]
    return [value1 > value2, value1 < value2]
  }
  
  export function calculateWeightedScore(laptop: any, weights: any) {
    const { benchmarks } = laptop;
    
    // Calculate the sum of (rating × weight)
    const weightedSum = 
      benchmarks.productivity * weights.performance +
      benchmarks.gaming * weights.gaming +
      benchmarks.display * weights.display +
      benchmarks.battery * weights.battery +
      (benchmarks.build * weights.portability);
    
    // Calculate the sum of weights
    const totalWeight = 
      weights.performance +
      weights.gaming +
      weights.display +
      weights.battery +
      weights.connectivity +
      weights.portability;
    
    // Calculate the normalized score (out of 10)
    const normalizedScore = (weightedSum / (totalWeight * 10)) * 10;
    
    return normalizedScore.toFixed(2);
  }
  
  export function getKeyDifferences(laptops: any[]) {
    const laptop1 = laptops[0]
    const laptop2 = laptops[1]
  
    const differences = {
      laptop1: [] as string[],
      laptop2: [] as string[],
    }
  
    // Weight difference
    const weight1 = Number.parseFloat(laptop1.detailedSpecs.case.weight.split(" ")[0])
    const weight2 = Number.parseFloat(laptop2.detailedSpecs.case.weight.split(" ")[0])
    if (weight1 < weight2) {
      differences.laptop1.push(`Lighter by ${(weight2 - weight1).toFixed(1)} kg`)
    } else if (weight2 < weight1) {
      differences.laptop2.push(`Lighter by ${(weight1 - weight2).toFixed(1)} kg`)
    }
  
    // Display refresh rate
    const refresh1 = Number.parseInt(laptop1.detailedSpecs.display.refreshRate)
    const refresh2 = Number.parseInt(laptop2.detailedSpecs.display.refreshRate)
    if (refresh1 > refresh2) {
      differences.laptop1.push(`Higher refresh rate (${refresh1}Hz vs ${refresh2}Hz)`)
    } else if (refresh2 > refresh1) {
      differences.laptop2.push(`Higher refresh rate (${refresh2}Hz vs ${refresh1}Hz)`)
    }
  
    // Battery capacity
    const battery1 = Number.parseInt(laptop1.detailedSpecs.battery.capacity)
    const battery2 = Number.parseInt(laptop2.detailedSpecs.battery.capacity)
    if (battery1 > battery2) {
      differences.laptop1.push(`Larger battery (${battery1}Wh vs ${battery2}Wh)`)
    } else if (battery2 > battery1) { // Fixed the condition here
      differences.laptop2.push(`Larger battery (${battery2}Wh vs ${battery1}Wh)`)
    }
  
    // Storage
    const storage1 = Number.parseInt(laptop1.specs.storage.split("GB")[0])
    const storage2 = Number.parseInt(laptop2.specs.storage.split("GB")[0])
    if (storage1 > storage2) {
      differences.laptop1.push(`More storage (${storage1}GB vs ${storage2}GB)`)
    } else if (storage2 > storage1) {
      differences.laptop2.push(`More storage (${storage2}GB vs ${storage1}GB)`)
    }
  
    // GPU performance
    if (laptop1.benchmarks.gaming > laptop2.benchmarks.gaming) {
      const diff = Math.round((laptop1.benchmarks.gaming / laptop2.benchmarks.gaming - 1) * 100)
      differences.laptop1.push(`Better gaming performance (${diff}% faster)`)
    } else if (laptop2.benchmarks.gaming > laptop1.benchmarks.gaming) {
      const diff = Math.round((laptop2.benchmarks.gaming / laptop1.benchmarks.gaming - 1) * 100)
      differences.laptop2.push(`Better gaming performance (${diff}% faster)`)
    }
  
    // CPU performance
    if (laptop1.benchmarks.productivity > laptop2.benchmarks.productivity) {
      const diff = Math.round((laptop1.benchmarks.productivity / laptop2.benchmarks.productivity - 1) * 100)
      differences.laptop1.push(`Better productivity performance (${diff}% faster)`)
    } else if (laptop2.benchmarks.productivity > laptop1.benchmarks.productivity) {
      const diff = Math.round((laptop2.benchmarks.productivity / laptop1.benchmarks.productivity - 1) * 100)
      differences.laptop2.push(`Better productivity performance (${diff}% faster)`)
    }
  
    // Display quality
    if (laptop1.benchmarks.display > laptop2.benchmarks.display) {
      differences.laptop1.push("Better display quality")
    } else if (laptop2.benchmarks.display > laptop1.benchmarks.display) {
      differences.laptop2.push("Better display quality")
    }
  
    // USB-C ports
    const usbc1 = laptop1.detailedSpecs.connectivity.ports.usbc
    const usbc2 = laptop2.detailedSpecs.connectivity.ports.usbc
    if (usbc1 > usbc2) {
      differences.laptop1.push(`More USB-C ports (${usbc1} vs ${usbc2})`)
    } else if (usbc2 > usbc1) {
      differences.laptop2.push(`More USB-C ports (${usbc2} vs ${usbc1})`)
    }
  
    return differences
  }