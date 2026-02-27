import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Camera, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-trust/10 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-trust" />
        </motion.div>
        <h1 className="font-display text-2xl font-bold mb-2">Thank You!</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Your review strengthens rural trust.
        </p>
        <button
          onClick={() => navigate("/bookings")}
          className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground mb-6">
        ← Back
      </button>

      <h1 className="font-display text-2xl font-bold mb-2">Leave a Review</h1>
      <p className="text-sm text-muted-foreground mb-8">Share your experience with the community</p>

      <div className="flex gap-2 mb-8 justify-center">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)}>
            <Star
              className={`w-10 h-10 transition-colors ${
                s <= rating ? "fill-accent text-accent" : "text-muted"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Tell us about your experience..."
        rows={4}
        className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors resize-none mb-4"
      />

      <button className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground transition-colors">
        <Camera className="w-4 h-4" />
        Upload a photo
      </button>

      <button
        onClick={() => rating > 0 && setSubmitted(true)}
        disabled={rating === 0}
        className={`w-full py-4 rounded-2xl font-semibold transition-all ${
          rating > 0
            ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewPage;
