import { Skeleton } from "@/components/ui/skeleton";

export function ShotsShimmer() {
  return (
    <div className="space-y-4 mt-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[50px_100px_1fr_1fr_1fr_1fr_1fr_1fr] 
                     bg-white transition-shadow mt-6 py-5 shadow-sm 
                     rounded-lg items-center"
        >
          {/* Checkbox placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-4 rounded" />
          </div>

          {/* Image placeholder */}
          <div>
            <Skeleton className="h-20 w-20 rounded-lg" />
          </div>

          {/* Shot Number placeholder */}
          <div className="p-4 flex justify-center">
            <Skeleton className="h-4 w-12 rounded" />
          </div>

          {/* Description placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Shoot Size placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Movement placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Shoot Type placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Estimated Time + Ellipsis placeholder */}
          <div className="p-4 flex justify-between">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
