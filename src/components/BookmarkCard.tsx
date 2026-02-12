import { Bookmark } from "@/types/bookmark";
import { motion } from "framer-motion";
import { ExternalLink, Trash2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  isNew?: boolean;
}

const BookmarkCard = ({ bookmark, onDelete, isNew }: BookmarkCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hostname = (() => {
    try {
      return new URL(bookmark.url).hostname;
    } catch {
      return bookmark.url;
    }
  })();

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bookmark.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(bookmark.id), 200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? -8 : 0, scale: isDeleting ? 0.95 : 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`card-surface group cursor-pointer p-4 ${isNew ? "bookmark-highlight" : ""}`}
      onClick={() => window.open(bookmark.url, "_blank", "noopener,noreferrer")}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
          <img
            src={faviconUrl}
            alt=""
            className="h-5 w-5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {bookmark.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground mt-0.5">
            {hostname}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
            aria-label="Copy URL"
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(bookmark.url, "_blank", "noopener,noreferrer");
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
            aria-label="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete bookmark"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookmarkCard;
