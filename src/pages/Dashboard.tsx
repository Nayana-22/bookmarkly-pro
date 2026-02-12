import { useState, useCallback } from "react";
import { Bookmark, User } from "@/types/bookmark";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { motion } from "framer-motion";

// Mock data for UI preview
const mockUser: User = {
  id: "1",
  email: "user@example.com",
  full_name: "Alex Johnson",
  avatar_url: undefined,
};

const mockBookmarks: Bookmark[] = [
  {
    id: "1",
    user_id: "1",
    title: "Linear – Plan and build products",
    url: "https://linear.app",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "1",
    title: "Vercel – Develop. Preview. Ship.",
    url: "https://vercel.com",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "1",
    title: "Notion – Your connected workspace",
    url: "https://notion.so",
    created_at: new Date().toISOString(),
  },
];

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(mockBookmarks);
  const [isLoading] = useState(false);
  const [newBookmarkId, setNewBookmarkId] = useState<string | null>(null);

  const handleAdd = useCallback(async (title: string, url: string) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 400));
    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      user_id: mockUser.id,
      title,
      url,
      created_at: new Date().toISOString(),
    };
    setBookmarks((prev) => [newBookmark, ...prev]);
    setNewBookmarkId(newBookmark.id);
    setTimeout(() => setNewBookmarkId(null), 1500);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} onLogout={onLogout} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-lg font-semibold text-foreground">Your Bookmarks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {bookmarks.length} {bookmarks.length === 1 ? "link" : "links"} saved
            </p>
          </div>

          {/* Add Form */}
          <BookmarkForm onAdd={handleAdd} />

          {/* Bookmark List */}
          <BookmarkList
            bookmarks={bookmarks}
            isLoading={isLoading}
            onDelete={handleDelete}
            newBookmarkId={newBookmarkId}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
