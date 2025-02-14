import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ScenesShotsShimmer() {
  // Adjust these numbers as needed (e.g., how many scenes or shots you want to show while loading)
  const placeholderScenes = 2;
  const placeholderShotsPerScene = 4;

  return (
    <div>
      {Array.from({ length: placeholderScenes }).map((_, sceneIndex) => (
        <div key={sceneIndex} className="mb-6 p-4">
          {/* Scene title */}
          <Skeleton className="h-5 w-32 mb-2" />
          {/* Scene description */}
          <Skeleton className="h-4 w-48 mb-4" />

          {/* Shots grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: placeholderShotsPerScene }).map((_, shotIndex) => (
              <Card key={shotIndex} className="w-full border-2 shadow-sm">
                {/* Shot image */}
                <Skeleton className="h-48 w-full rounded-t-lg" />

                {/* Shot title */}
                <Skeleton className="h-4 w-2/3 mt-6 mb-4 mx-auto" />

                <CardContent className="space-y-4 p-0">
                  {/* Description row */}
                  <div className="flex items-center gap-3 border-b pb-2 px-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>

                  {/* Audio row */}
                  <div className="flex items-center gap-3 border-b pb-2 px-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>

                  {/* Video row */}
                  <div className="flex items-center gap-3 border-b pb-2 px-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
