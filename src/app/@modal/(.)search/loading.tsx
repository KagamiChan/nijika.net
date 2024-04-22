import { SkeletonModal } from "~/components/modal"
import { Skeleton } from "~/components/ui/skeleton"

const Loading = () => {
  return (
    <SkeletonModal>
      <Skeleton className="h-10 w-full" />
    </SkeletonModal>
  )
}

export default Loading
