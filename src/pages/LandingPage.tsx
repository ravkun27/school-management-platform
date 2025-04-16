import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  GraduationCap,
  FileText,
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const LandingPage = () => {
  const upcomingEvents = [
    { date: "May 10", title: "Parent-Teacher Conference", type: "Academic" },
    { date: "May 15", title: "Annual Sports Day", type: "Sports" },
    { date: "May 22", title: "Science Fair", type: "Academic" },
    { date: "May 30", title: "End of Term Concert", type: "Cultural" },
  ];

  const achievements = [
    "100% graduation rate for the past 5 years",
    "Regional Champions in Debate Competition",
    "Winner of National Clean School Award",
    "Top 10 in State Academic Rankings",
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Top Information Bar */}
      <div className="bg-primary text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <Mail size={14} className="mr-1" />
              <span>info@springfieldacademy.edu</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/auth/sign-up" className="hover:underline">
              Student Portal
            </Link>
            <Link to="/auth/sign-up" className="hover:underline">
              Staff Portal
            </Link>
            <Link to="auth/admin/sign-in" className="hover:underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gray-200 dark:bg-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          {/* Replace with your school image */}
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <img
              src="https://media.gettyimages.com/id/1756562035/photo/university-campus.jpg?s=612x612&w=gi&k=20&c=4sDKIjJco4wDfKNjIEsdUOeQw1D5XP4PYOskSTPnwE4="
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Inspiring Excellence Since 1985
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Providing quality education and nurturing future leaders in a
            supportive and innovative learning environment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/admissions"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Apply Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/virtual-tour"
              className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Virtual Tour
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Calendar />, text: "Calendar", link: "/calendar" },
              { icon: <FileText />, text: "News & Events", link: "/news" },
              {
                icon: <GraduationCap />,
                text: "Admissions",
                link: "/admissions",
              },
              { icon: <Users />, text: "Faculty & Staff", link: "/faculty" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-primary mb-2">{item.icon}</div>
                <span className="font-medium">{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-8 lg:space-x-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              {/* Replace with actual school image */}
              <div className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-video flex items-center justify-center">
                <img
                  src="https://s39613.pcdn.co/wp-content/uploads/2019/06/when-everything-goes-right-in-the-classroom-190612.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to Springfield Academy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Springfield Academy provides a nurturing and intellectually
                stimulating environment where students develop a passion for
                learning and the skills to succeed in a rapidly changing world.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                With a rich history spanning over 35 years, we offer
                comprehensive educational programs from kindergarten through
                12th grade, focused on academic excellence, character
                development, and global citizenship.
              </p>
              <div className="space-y-3 mb-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-success bg-opacity-20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-success text-lg">✓</span>
                    </div>
                    <span className="ml-2">{achievement}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Learn more about our school
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Our Academic Programs</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive education from early childhood through high school,
              designed to develop well-rounded individuals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Elementary (K-5)",
                description:
                  "Building fundamental skills and fostering a love for learning through an engaging curriculum",
                image: "elementary-students",
              },
              {
                title: "Middle School (6-8)",
                description:
                  "Developing critical thinking and social skills during these formative years",
                image: "middle-school",
              },
              {
                title: "High School (9-12)",
                description:
                  "Preparing students for college and beyond with rigorous academics and specialized tracks",
                image: "high-school",
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Program image placeholder */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {program.image}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {program.description}
                  </p>
                  <Link
                    to={`/academics/${program.title
                      .split(" ")[0]
                      .toLowerCase()}`}
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Campus Life</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Springfield Academy offers a vibrant campus life with activities
              that complement academic learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Sports", image: "sports" },
              { title: "Arts & Music", image: "arts" },
              { title: "Clubs", image: "clubs" },
              { title: "Community Service", image: "community" },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/campus-life/${category.title
                  .toLowerCase()
                  .replace(" & ", "-")
                  .replace(" ", "-")}`}
                className="group relative rounded-xl overflow-hidden aspect-square"
              >
                {/* Category image placeholder */}
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-gray-500 dark:text-gray-400">
                    {category.image}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-semibold">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                News & Upcoming Events
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest happenings at Springfield Academy
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/news-events"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Latest News</h3>

              <div className="space-y-6">
                {[
                  {
                    title: "Springfield Academy Wins Science Fair Championship",
                    date: "May 2, 2025",
                    image: "science-fair",
                    excerpt:
                      "Our students took first place in the Regional Science Fair with their innovative sustainable energy project...",
                  },
                  {
                    title: "New Arts Center Opening This Fall",
                    date: "April 28, 2025",
                    image: "arts-center",
                    excerpt:
                      "We're excited to announce the grand opening of our new state-of-the-art Visual and Performing Arts Center...",
                  },
                ].map((news, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4">
                    {/* News image placeholder */}
                    <div className="w-full md:w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        {news.image}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {news.date}
                      </span>
                      <h4 className="text-lg font-medium mb-1">{news.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {news.excerpt}
                      </p>
                      <Link
                        to={`/news/${news.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded p-2 mr-4 flex flex-col items-center justify-center flex-shrink-0 w-12">
                        <span className="text-primary font-bold">
                          {event.date.split(" ")[0]}
                        </span>
                        <span className="text-xs">
                          {event.date.split(" ")[1]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/calendar"
                className="inline-flex items-center text-primary hover:underline font-medium mt-4"
              >
                View full calendar
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Community Says</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from students, parents, and alumni about their experiences at
              Springfield Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Springfield Academy provided me with incredible opportunities both academically and in extracurricular activities. The teachers truly care about student success.",
                name: "Emma R.",
                role: "Class of 2023, now at Stanford University",
              },
              {
                quote:
                  "The supportive community and challenging curriculum helped my child develop confidence and a love for learning. We couldn't be happier with our choice.",
                name: "Michael J.",
                role: "Parent of 8th Grader",
              },
              {
                quote:
                  "Teaching at Springfield Academy has been the most rewarding experience of my career. The collaborative environment allows us to bring out the best in our students.",
                name: "Mrs. Patel",
                role: "Science Teacher, 10 years at SA",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              >
                <div className="mb-4 text-primary">
                  {/* Quote icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V15C10 16.0609 9.57857 17.0783 8.82843 17.8284C8.07828 18.5786 7.06087 19 6 19H5M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V15C20 16.0609 19.5786 17.0783 18.8284 17.8284C18.0783 18.5786 17.0609 19 16 19H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="italic mb-4 text-gray-600 dark:text-gray-400">
                  {testimonial.quote}
                </p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a visit to our campus or apply online to begin your journey
            at Springfield Academy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-all"
            >
              Apply Now
            </Link>
            <Link
              to="/visit"
              className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
