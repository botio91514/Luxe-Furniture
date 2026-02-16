
import InteractiveHero from '../sections/InteractiveHero';
import Ticker from '../sections/Ticker';
import FeaturedCategories from '../sections/FeaturedCategories';
import Collection from '../sections/Collection';
import HorizontalCinema from '../sections/HorizontalCinema';
import Craftsmanship from '../sections/Craftsmanship';
import Materials from '../sections/Materials';
import CTA from '../sections/CTA';
import Testimonials from '../sections/Testimonials';

const Home = () => {
    return (
        <main className="w-full relative bg-white">
            <InteractiveHero />

            <div className="relative z-10 bg-white">
                <Ticker />
                <FeaturedCategories />
            </div>

            <div className="relative z-10 bg-white">
                {/* Preview Collection - limit to 3 items */}
                <Collection limit={3} />
            </div>

            {/* The Horizontal Cinema Archive */}
            <div className="relative z-20">
                <HorizontalCinema />
            </div>

            {/* Brutalist Craftsmanship Section - Sticky/Bold */}
            <div className="relative z-10 bg-black text-white">
                <Craftsmanship />
            </div>

            <div className="relative z-10 bg-[#F3F3F3]">
                <Materials />
                <CTA />
                <Testimonials />
            </div>
        </main>
    );
};

export default Home;
