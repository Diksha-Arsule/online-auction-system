import { Link } from "react-router";
// import { AdsComponent } from "../components/AdsComponent";
import { useSelector } from "react-redux";

export const About = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-sm shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            About This Project
          </h1>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg">
              Welcome to our Online Auction System - a comprehensive web
              application designed to facilitate online bidding and auctions.
              
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Project Overview
              </h2>
              <p>
                The Online Auction System is a modern web-based platform designed
              to simplify, manage, and digitize the auction process. It empowers
              users to participate in real-time bidding and helps sellers manage
              their listings effortlessly
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>User registration and authentication</li>
                <li>Real-time auction bidding</li>
                <li>Item listing and management</li>
                <li>User profile management</li>
                <li>Responsive design for all devices</li>
              </ul>
            </section>

          
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center">
                Have questions or need support? Feel free to{" "}
                <Link
                  to="/contact"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  contact us
                </Link>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
