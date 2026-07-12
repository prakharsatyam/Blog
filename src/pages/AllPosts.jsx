import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, invalidateCache } from "../store/blogSlice";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import { ArrowLeft, Calendar, RefreshCw } from "lucide-react";

export default function AllPosts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Connect to Redux Cache
  const { posts, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchPosts(false)); // False means load from cache if fresh
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts(true)); // Force reload from server
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  // Helper for cover image rendering with safe fallbacks
  const getCoverImage = (featuredImage) => {
    if (featuredImage) {
      try {
        const url = appwriteService.getFilePreview(featuredImage);
        if (url) return url;
      } catch (err) {
        console.error("Error getting file preview:", err);
      }
    }
    // Return a visually matching abstract linear gradient block as a placeholder
    return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='100%' height='100%' fill='%23eb4d6d'/><circle cx='400' cy='250' r='120' fill='%23111111' opacity='0.15'/></svg>";
  };

  return (
    <div className="py-16 bg-cream min-h-screen text-ink">
      <Container>
        {/* Navigation & Refresh Control */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors font-inter text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 text-xs font-inter text-ink-light hover:text-ink transition-colors border border-ink/10 rounded-full px-4 py-2 hover:bg-cream-dark/30 disabled:opacity-50"
            title="Reload from server"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Sync Feed
          </button>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-12">
          <h1 className="font-archivo text-heading-2 md:text-heading-1 text-ink mb-4">
            Writing Archive
          </h1>
          <p className="text-ink-light font-inter text-base md:text-lg">
            Thoughts, insights, and lessons learned while building in AI, machine learning, and legacy modernization.
          </p>
          <div className="w-full h-px bg-ink/10 mt-8" />
        </div>

        {/* Content Render States */}
        {loading && (!posts || posts.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-ink-light font-inter text-sm animate-pulse">Loading archive from cache...</p>
          </div>
        ) : error && (!posts || posts.length === 0) ? (
          <div className="text-center py-20 bg-accent/5 rounded-3xl border border-accent/10 max-w-2xl mx-auto">
            <h3 className="font-archivo text-xl font-bold text-accent mb-2">Sync Error</h3>
            <p className="text-ink-light font-inter text-sm mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 rounded-full bg-ink text-cream hover:bg-accent hover:text-white text-xs font-semibold font-inter transition-all duration-300"
            >
              Retry Sync
            </button>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-20 bg-cream-dark/20 rounded-3xl border border-ink/5 max-w-2xl mx-auto">
            <h3 className="font-archivo text-xl font-bold text-ink mb-2">No articles found</h3>
            <p className="text-ink-light font-inter text-sm mb-4">
              Articles will appear here once they are published in the Appwrite database.
            </p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 rounded-full bg-ink text-cream hover:bg-accent hover:text-white text-xs font-semibold font-inter transition-all duration-300"
            >
              Force Sync Database
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                href={`/post/${post.slug || post.$id}`}
                key={post.$id}
                className="group flex flex-col h-full bg-cream-dark/30 hover:bg-cream-dark/60 border border-ink/5 hover:border-ink/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Cover image (Renders preview from storage ID or fallback) */}
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-cream-dark relative">
                  <img
                    src={getCoverImage(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Inline SVG fallback on img load error
                      e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='100%' height='100%' fill='%23eb4d6d'/><circle cx='400' cy='250' r='120' fill='%23111111' opacity='0.15'/></svg>";
                    }}
                  />
                  {post.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-accent text-white text-[9px] font-semibold tracking-wider uppercase">
                      Featured
                    </span>
                  )}
                </div>
                
                {/* Meta details */}
                <div className="flex items-center gap-2 mb-3 text-xs text-ink-light">
                  <Calendar size={12} />
                  <span>{formatDate(post.publishedDate || post.$createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className="font-archivo text-lg md:text-xl font-bold text-ink group-hover:text-accent transition-colors duration-300 mb-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-inter text-sm text-ink/70 leading-relaxed flex-grow">
                  {post.excerpt || stripHtml(post.content)}
                </p>

                {/* Action Trigger */}
                <div className="mt-4 pt-4 border-t border-ink/5 flex items-center justify-between text-xs text-ink-light font-medium group-hover:text-ink transition-colors">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
