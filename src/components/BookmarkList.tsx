import { Bookmark } from "@/types/bookmark";
import BookmarkCard from "./BookmarkCard";
import { AnimatePresence } from "framer-motion";
import { Bookmark as BookmarkIcon } from "lucide-react";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  newBookmarkId?: string | null;
}

const SkeletonCard = () => (
  <div className="card-surface p-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-xl skeleton-shimmer" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded-lg skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded-lg skeleton-shimmer" />
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
      <BookmarkIcon className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="text-sm font-semibold text-foreground">No bookmarks yet</h3>
    <p className="mt-1 text-xs text-muted-foreground">
      Add your first bookmark above
    </p>
  </div>
);

const BookmarkList = ({ bookmarks, isLoading, onDelete, newBookmarkId }: BookmarkListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={onDelete}
            isNew={bookmark.id === newBookmarkId}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BookmarkList;
