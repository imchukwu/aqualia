import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Droplets, Shield, Award, Users, Target, Heart } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Droplets,
      title: 'Purity',
      description: 'We are committed to delivering 100% pure, clean water through advanced filtration technology.',
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'Every product meets the highest standards and is NAFDAC approved for your safety.',
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'We care deeply about the health and well-being of every customer we serve.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We are dedicated to serving Nigerian communities with reliable access to clean water.',
    },
  ];



  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 gradient-water bubble-pattern">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Aqualia
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Quenching thirst, refreshing life. We are Nigeria's trusted source
              for premium quality pure water.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Aqualia Table Water was founded with a simple yet powerful mission:
                    to provide every Nigerian with access to pure, safe, and refreshing water.
                    Based in Owerri, Imo State, we started as a small family business with
                    a commitment to quality.
                  </p>
                  <p>
                    Today, we have grown to become one of the most trusted water brands
                    in the region, serving thousands of homes, offices, and businesses
                    with our premium water products.
                  </p>
                  <p>
                    Our state-of-the-art purification facility uses advanced multi-stage
                    filtration and UV treatment to ensure every drop of Aqualia water
                    meets the highest purity standards.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl gradient-ocean flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Droplets className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-2xl font-bold">Pure Water</p>
                    <p className="text-primary-foreground/80">Since 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-card shadow-soft">
                <div className="w-16 h-16 rounded-full gradient-ocean flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide affordable, high-quality, and safe drinking water to every
                  Nigerian household and business, while maintaining the highest standards
                  of production and customer service.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-card shadow-soft">
                <div className="w-16 h-16 rounded-full gradient-ocean flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become Nigeria's leading water brand, recognized for excellence
                  in quality, innovation, and customer satisfaction, while contributing
                  to the health and well-being of our communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do at Aqualia
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-ocean flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
