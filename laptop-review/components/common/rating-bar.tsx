interface RatingBarProps {
    score: number
    label?: string
    maxScore?: number
  }
  
  export default function RatingBar({ score, label, maxScore = 10 }: RatingBarProps) {
    // Ensure score is between 0 and maxScore
    const normalizedScore = Math.max(0, Math.min(score, maxScore));
    const percentage = (normalizedScore / maxScore) * 100;
  
    // Determine color based on score
    let colorClass = "bg-red-500";
    if (percentage >= 70) {
      colorClass = "bg-green-500";
    } else if (percentage >= 50) {
      colorClass = "bg-yellow-500";
    } else if (percentage >= 30) {
      colorClass = "bg-orange-500";
    }
  
    return (
      <div className="mb-4">
        {label && (
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm font-medium text-gray-700">{score}/{maxScore}</span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${colorClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }
  