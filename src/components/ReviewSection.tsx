import { useState, useEffect } from "react";
import { Star, Send, Trash2, Edit2, X, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  profile?: { full_name: string | null; avatar_url: string | null };
}

interface ReviewSectionProps {
  targetId: string;
  reviewType: "place" | "food" | "room";
  title?: string;
}

const MAX_COMMENT_LENGTH = 500;

const StarRating = ({ rating, onRate, interactive = false, size = "w-5 h-5" }: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: string;
}) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={!interactive}
        onClick={() => onRate?.(star)}
        className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
      >
        <Star
          className={`${size} ${star <= rating ? "fill-accent text-accent" : "text-border"}`}
        />
      </button>
    ))}
  </div>
);

const ReviewSection = ({ targetId, reviewType, title = "Reviews" }: ReviewSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    const { data: reviewData } = await supabase
      .from("reviews")
      .select("*")
      .eq("review_type", reviewType)
      .eq("target_id", targetId)
      .order("created_at", { ascending: false });

    if (reviewData && reviewData.length > 0) {
      const userIds = [...new Set(reviewData.map((r: any) => r.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p: any) => [p.user_id, p]) || []);
      const enriched = reviewData.map((r: any) => ({
        ...r,
        profile: profileMap.get(r.user_id) || null,
      }));
      setReviews(enriched as Review[]);
    } else {
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, [targetId, reviewType]);

  const userReview = reviews.find((r) => r.user_id === user?.id);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const resetForm = () => {
    setNewRating(0);
    setNewComment("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to leave a review", variant: "destructive" });
      return;
    }
    if (newRating === 0) {
      toast({ title: "Rating required", description: "Please select a star rating", variant: "destructive" });
      return;
    }
    const trimmedComment = newComment.trim().slice(0, MAX_COMMENT_LENGTH);

    setSubmitting(true);
    if (editingId) {
      const { error } = await supabase
        .from("reviews")
        .update({ rating: newRating, comment: trimmedComment, updated_at: new Date().toISOString() })
        .eq("id", editingId);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Updated", description: "Your review has been updated" });
      }
    } else {
      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        review_type: reviewType,
        target_id: targetId,
        rating: newRating,
        comment: trimmedComment,
      });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already reviewed", description: "You can edit your existing review", variant: "destructive" });
        } else {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        }
      } else {
        toast({ title: "Thanks!", description: "Your review has been submitted" });
      }
    }
    setSubmitting(false);
    resetForm();
    fetchReviews();
  };

  const handleEdit = (review: Review) => {
    setNewRating(review.rating);
    setNewComment(review.comment);
    setEditingId(review.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast({ title: "Deleted", description: "Review removed" });
    fetchReviews();
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <div className="flex items-center gap-2 mt-1">
            {avgRating && (
              <>
                <StarRating rating={Math.round(Number(avgRating))} size="w-3.5 h-3.5" />
                <span className="text-sm font-semibold">{avgRating}</span>
              </>
            )}
            <span className="text-xs text-muted-foreground">({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
          </div>
        </div>
        {user && !userReview && !showForm && (
          <Button size="sm" variant="outline" onClick={() => setShowForm(true)} className="gap-1.5">
            <Star className="w-3.5 h-3.5" /> Write Review
          </Button>
        )}
      </div>

      {/* Review form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{editingId ? "Edit Review" : "Your Rating"}</p>
                <button onClick={resetForm} className="p-1 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <StarRating rating={newRating} onRate={setNewRating} interactive size="w-7 h-7" />
              <div className="relative">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
                  placeholder="Share your experience... (optional)"
                  className="min-h-[80px] resize-none"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">
                  {newComment.length}/{MAX_COMMENT_LENGTH}
                </span>
              </div>
              <Button onClick={handleSubmit} disabled={submitting || newRating === 0} className="w-full gap-2">
                <Send className="w-4 h-4" /> {editingId ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews list */}
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                {review.profile?.avatar_url ? (
                  <img src={review.profile.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">
                      {review.profile?.full_name || "Anonymous"}
                    </p>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{timeAgo(review.created_at)}</span>
                  </div>
                  <StarRating rating={review.rating} size="w-3 h-3" />
                  {review.comment && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.comment}</p>
                  )}
                  {review.user_id === user?.id && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleEdit(review)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="text-xs text-destructive hover:text-destructive/80 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
