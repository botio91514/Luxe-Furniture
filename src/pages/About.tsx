import Philosophy from '../sections/Philosophy';
import Craftsmanship from '../sections/Craftsmanship';

const About = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#F3F3F3]">
            {/* Hero for About Page */}
            <header className="relative py-24 px-6 md:px-12 lg:px-20 text-center">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif text-black leading-tight mb-6">Our Story</h1>
                <p className="text-lg md:text-xl text-[#5E5E5E] font-light max-w-2xl mx-auto">
                    A journey through decades of passion, craftsmanship, and the relentless pursuit of perfection.
                </p>
            </header>

            <Philosophy />
            <Craftsmanship />

            {/* Maybe a 'Team' or 'History' section here later */}
        </div>
    );
};

export default About;
