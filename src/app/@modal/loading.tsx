import { SkeletonModal } from "~/components/modal"
import { Skeleton } from "~/components/ui/skeleton"

const Loading = () => {
  return (
    <SkeletonModal>
      <Skeleton className="h-10 w-16" />
    </SkeletonModal>
  )
}

export default Loading
