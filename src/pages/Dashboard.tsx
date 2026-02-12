import { useState, useCallback, useEffect } from "react";
import { Bookmark, User } from "@/types/bookmark";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newBookmarkId, setNewBookmarkId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          full_name:
            authUser.user_metadata?.full_name ||
            authUser.user_metadata?.name ||
            authUser.email?.split("@")[0] ||
            "User",
          avatar_url:
            authUser.user_metadata?.avatar_url ||
            authUser.user_metadata?.picture,
        });
      }
    };
    fetchUser();
  }, []);

  // Fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookmarks:", error);
        toast({
          title: "Error",
          description: "Failed to load bookmarks",
          variant: "destructive",
        });
      } else {
        setBookmarks(data || []);
      }
      setIsLoading(false);
    };
    fetchBookmarks();
  }, [toast]);

  const handleAdd = useCallback(
    async (title: string, url: string) => {
      if (!user) return;

      type BookmarkInsert = {
        title: string;
        url: string;
        user_id: string;
      };

      const newBookmark: BookmarkInsert = { title, url, user_id: user.id };

      const { data, error } = await supabase
        .from("bookmarks")
        .insert(newBookmark as any)
        .select()
        .single();

      if (error) {
        console.error("Error adding bookmark:", error);
        toast({
          title: "Error",
          description: "Failed to add bookmark",
          variant: "destructive",
        });
      } else if (data) {
        const bookmark = data as Bookmark;
        setBookmarks((prev) => [bookmark, ...prev]);
        setNewBookmarkId(bookmark.id);
        setTimeout(() => setNewBookmarkId(null), 1500);
        toast({
          title: "Success",
          description: "Bookmark added successfully",
        });
      }
    },
    [user, toast],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);

      if (error) {
        console.error("Error deleting bookmark:", error);
        toast({
          title: "Error",
          description: "Failed to delete bookmark",
          variant: "destructive",
        });
      } else {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
        toast({
          title: "Success",
          description: "Bookmark deleted successfully",
        });
      }
    },
    [toast],
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Your Bookmarks
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {bookmarks.length} {bookmarks.length === 1 ? "link" : "links"}{" "}
              saved
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
