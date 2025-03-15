import React, { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ColorContext"; 
import "../../font.css";

const AboutUs = () => {
  const { isNightMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen fontly ${
        isNightMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div
          className={`rounded-lg shadow-md overflow-hidden ${
            isNightMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center px-4">
              About Our Blog
            </h1>
          </div>

          <div className="p-8">
            <div className="prose max-w-none">
              <h2
                className={`text-2xl font-semibold mb-4 ${
                  isNightMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Our Story
              </h2>
              <p
                className={`mb-6 ${
                  isNightMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Founded in 2023, our blog started as a small passion project and
                has grown into a vibrant community of writers, thinkers, and
                readers. We believe in the power of words to inspire, educate,
                and connect people from all walks of life.
              </p>

              <h2
                className={`text-2xl font-semibold mb-4 ${
                  isNightMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`mb-6 ${
                  isNightMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                We're dedicated to providing thoughtful, well-researched content
                that matters. Our mission is to create a space where ideas can
                flourish and meaningful conversations can take place. We strive
                to cover topics that are not only interesting but also
                impactful.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div
                  className={`p-6 rounded-lg ${
                    isNightMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isNightMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Our Values
                  </h3>
                  <ul
                    className={`list-disc pl-5 space-y-2 ${
                      isNightMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <li>Authenticity in every piece we publish</li>
                    <li>Respect for diverse perspectives</li>
                    <li>Commitment to factual accuracy</li>
                    <li>Accessibility for readers of all backgrounds</li>
                  </ul>
                </div>
                <div
                  className={`p-6 rounded-lg ${
                    isNightMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isNightMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Our Team
                  </h3>
                  <p
                    className={`${
                      isNightMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Our team consists of passionate writers, editors, and
                    content creators from around the world. Each brings their
                    unique perspective and expertise, creating a rich tapestry
                    of content for our readers.
                  </p>
                </div>
              </div>

              <h2
                className={`text-2xl font-semibold mb-4 ${
                  isNightMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Join Our Community
              </h2>
              <p
                className={`mb-6 ${
                  isNightMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                We're always looking to grow our community of readers and
                contributors. Whether you're here to learn, share, or simply
                explore, we welcome you to be part of our journey.
              </p>

              <div
                className={`p-6 rounded-lg mt-8 ${
                  isNightMode
                    ? "bg-blue-900 border-blue-800"
                    : "bg-blue-50 border-blue-100"
                } border`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    isNightMode ? "text-blue-100" : "text-blue-800"
                  }`}
                >
                  Get in Touch
                </h3>
                <p
                  className={`${
                    isNightMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Have questions, suggestions, or just want to say hello? We'd
                  love to hear from you! Reach out to us at{" "}
                  <span className="text-blue-500">contact@astra.io</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
