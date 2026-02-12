import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";

interface BookmarkFormProps {
  onAdd: (title: string, url: string) => Promise<void>;
}

const BookmarkForm = ({ onAdd }: BookmarkFormProps) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState("");

  const isValid = url.trim() !== "" && title.trim() !== "";

  const validateUrl = (value: string) => {
    if (!value) {
      setUrlError("");
      return;
    }
    try {
      new URL(value.startsWith("http") ? value : `https://${value}`);
      setUrlError("");
    } catch {
      setUrlError("Please enter a valid URL");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    setIsSubmitting(true);
    try {
      await onAdd(title.trim(), normalizedUrl);
      setUrl("");
      setTitle("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-elevated p-5">
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50"
            aria-label="Bookmark title"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              validateUrl(e.target.value);
            }}
            className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/20 ${
              urlError ? "border-destructive focus:border-destructive" : "border-border focus:border-primary/50"
            }`}
            aria-label="Bookmark URL"
            aria-invalid={!!urlError}
          />
          {urlError && (
            <p className="mt-1.5 text-xs text-destructive">{urlError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid || isSubmitting || !!urlError}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {isSubmitting ? "Adding..." : "Add Bookmark"}
        </button>
      </div>
    </form>
  );
};

export default BookmarkForm;
