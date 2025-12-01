export default function HeroSection() {
  return (
    <section
      id="home"
      className="w-full relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-1000 ease-out"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=Fresh%20colorful%20smoothie%20bowls%20and%20healthy%20snacks%20arranged%20beautifully%20on%20a%20clean%20white%20marble%20counter%20with%20natural%20lighting,%20vibrant%20fruits%20like%20berries,%20mango,%20and%20banana%20visible,%20modern%20minimalist%20kitchen%20background%20with%20soft%20pastel%20colors,%20professional%20food%20photography%20style,%20high%20quality,%20appetizing%20presentation&width=1920&height=1080&seq=hero1&orientation=landscape')",
        }}
      ></div>

      {/* Animated colorful blobs */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 animate-bounce delay-1000"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-25 animate-ping"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-1000 ease-out">
            Your{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                trusted
              </span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
            </span>
            <br />
            companion
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-300">
            The smoothie and snack shop that'll take you places with fresh,
            healthy, and delicious options
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out delay-500">
            <a href="#menu" data-discover="true">
              <button className="inline-flex items-center justify-center font-medium rounded-full cursor-pointer whitespace-nowrap border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg min-w-[12rem] transform hover:scale-105 transition duration-300 hover:shadow-lg">
                <i className="ri-play-circle-line mr-2"></i>
                View Menu
              </button>
            </a>
          </div>

          {/* Trusted rating */}
          <div className="mt-12 pt-8 border-t border-gray-200 transition-all duration-1000 ease-out delay-700">
            <p className="text-sm text-gray-500 mb-4">
              Trusted by more than 50,000 health enthusiasts
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <i
                    key={i}
                    className="ri-star-fill text-yellow-400 animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  ></i>
                ))}
                <span className="ml-2 text-sm text-gray-600">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <i className="ri-arrow-down-line text-2xl text-gray-400 animate-pulse"></i>
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
