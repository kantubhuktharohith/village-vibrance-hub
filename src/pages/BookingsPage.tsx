import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { bookings } from "@/data/mockData";

const BookingsPage = () => {
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");
  const navigate = useNavigate();

  const filtered = bookings.filter((b) => b.status === tab);

  return (
    <div className="px-5 py-4">
      <div className="flex gap-2 mb-6">
        {(["upcoming", "completed"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No {tab} bookings</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={booking.image}
                  alt={booking.villageName}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{booking.experienceTitle}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {booking.villageName}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        booking.status === "upcoming"
                          ? "bg-trust/10 text-trust"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {booking.status === "upcoming" ? "Upcoming" : "Completed"}
                    </span>
                  </div>
                </div>
              </div>
              {booking.status === "completed" && (
                <div className="border-t px-4 py-3">
                  <button
                    onClick={() => navigate("/review")}
                    className="w-full text-sm font-semibold text-primary hover:underline"
                  >
                    Leave a Review →
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
