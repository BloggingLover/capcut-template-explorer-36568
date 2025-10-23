import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { ApiService, VideoTemplate } from "@/services/api";
import { TemplateCard } from "@/components/TemplateCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BannerAd } from "@/components/BannerAd";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBackButton } from "@/hooks/useBackButton";
import { adMobService } from "@/services/admob";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const query = searchParams.get('q') || '';
  
  // Handle hardware back button
  useBackButton();

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchTemplates(query);
    }
  }, [query]);

  const searchTemplates = async (searchTerm: string) => {
    setLoading(true);
    
    // Show interstitial ad while search is running
    adMobService.showInterstitial();
    
    try {
      const response = await ApiService.searchTemplates(searchTerm);
      setTemplates(response.data?.video_templates || []);
    } catch (error) {
      console.error('Error searching templates:', error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Search Results</h1>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button type="submit" size="lg" variant="secondary" className="h-12">
                <SearchIcon className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </header>

      {/* Results */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <LoadingSpinner message="Searching templates..." />
        ) : templates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-muted-foreground mb-4">No templates found</p>
            <p className="text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Results for "{query}"
              </h2>
              <p className="text-muted-foreground">
                {templates.length} templates found
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {templates.map((template, index) => (
                <>
                  <TemplateCard key={template.web_id} template={template} />
                  {/* Show banner ad randomly after every 3-4 templates */}
                  {(index + 1) % (Math.random() > 0.5 ? 3 : 4) === 0 && (
                    <div className="col-span-full">
                      <BannerAd />
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Search;
