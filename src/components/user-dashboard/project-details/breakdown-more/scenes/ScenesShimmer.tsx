import { Skeleton } from "@/components/ui/skeleton";

export function ScenesShimmer() {
  // Generate multiple skeleton rows
  return (
    <div className="space-y-4 mt-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr] 
                     bg-white transition-shadow py-5 shadow-sm rounded-lg 
                     border-l-8 border-sky-300 items-center"
        >
          {/* Checkbox placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-4 rounded" />
          </div>

          {/* Scene ID & Name + Description placeholder */}
          <div className="p-4 flex gap-5 items-center">
            <Skeleton className="h-4 w-8 rounded" />
            <div>
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-48 rounded mt-2" />
            </div>
          </div>

          {/* Characters placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Shooting Date placeholder */}
          <div className="p-4">
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Script Pages placeholder */}
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
