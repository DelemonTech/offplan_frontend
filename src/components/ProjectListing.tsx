import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';

interface ProjectListingProps {
  onRequestInfo?: (projectTitle: string) => void;
}

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  tags: string[];
  handoverDate: string;
}

const ProjectListing = ({ onRequestInfo }: ProjectListingProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [displayedProjects, setDisplayedProjects] = useState(12);
  const [activeFilter, setActiveFilter] = useState(t('Ready'));
  const [projects, setProjects] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [to, setTo] = useState(0);
  const [total, setTotal] = useState(0);

  const filterTabs = [t('Ready'), t('Offplan'), t('Pre launch')];

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://panel.estaty.app/api/v1/getProperties', {
          method: 'POST',
          headers: {
            'App-key': import.meta.env.VITE_ESTATY_API_KEY,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        // Correct mapping path!
        const mapped = (data.properties.data || []).map(item => ({
          id: item.id,
          title: item.title,
          price: item.low_price ? item.low_price : 'N/A',
          location: `${item.city?.name || ''}${item.district?.name ? ', ' + item.district.name : ''}`,
          image: item.cover || 'https://via.placeholder.com/500x300?text=No+Image',
          tags: [
            item.property_status?.name || t('Off Plan'),
            item.sales_status?.name || t('Pre Launch')
          ],
          handoverDate: item.delivery_date
            ? new Date(Number(item.delivery_date) * 1000).getFullYear().toString()
            : 'N/A'
        }));
        setProjects(mapped);
        setTo(data.properties.to || mapped.length);
        setTotal(data.properties.total || mapped.length);
      } catch (err) {
        setProjects([]);
        setTo(0);
        setTotal(0);
      }
      setLoading(false);
    };
    fetchProjects();
  }, [i18n.language]);

  const projectsToShow = projects.slice(0, displayedProjects);
  const hasMoreProjects = displayedProjects < projects.length;

  const handleLoadMore = () => {
    setDisplayedProjects(prev => Math.min(prev + 12, projects.length));
  };

  const handleProjectClick = (project: Property) => {
    const slug = project.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/projects/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("Your Next Home Starts Here")}
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            {t("Curated by Sahar, crafted for your future.")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeFilter === tab
                  ? 'bg-[#6084ee] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">{t('Loading...')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {projectsToShow.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-md group transform hover:-translate-y-2"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <Badge className="bg-[#6084ee] text-white shadow-lg">
                      {project.tags[0]}
                    </Badge>
                    <Badge className="bg-white text-gray-800 shadow-lg hover:text-white transition-colors">
                      {project.handoverDate}
                    </Badge>
                  </div>
                  {project.tags[1] && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#f24ca0] text-white shadow-lg">
                        {project.tags[1]}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#6084ee] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#f24ca0]">
                      {isNaN(Number(project.price))
                        ? (t("AED") + " " + t("N/A"))
                        : `${t("AED")} ${new Intl.NumberFormat('en-US').format(Number(project.price))}`}
                    </span>
                    <Button
                      size="sm"
                      className="bg-[#6084ee] hover:bg-[#6084ee]/90 text-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onRequestInfo) {
                          onRequestInfo(project.title);
                        }
                      }}
                    >
                      {t("View Details")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMoreProjects && !loading && (
          <div className="text-center">
            <Button
              onClick={handleLoadMore}
              size="lg"
              className="bg-gradient-to-r from-[#f24ca0] to-[#f24ca0]/90 hover:from-[#f24ca0]/90 hover:to-[#f24ca0] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              {t("Load More Projects")}
              <span className="ml-2 bg-white/20 px-3 py-1 rounded-lg text-sm">
                {projects.length - displayedProjects} {t("remaining")}
              </span>
            </Button>
          </div>
        )}

        {/* Projects Count */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            {t("Showing")} {to} {t("of")} {total} {t("projects")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectListing;
