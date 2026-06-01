import React, { forwardRef } from 'react';

const ContactMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-[#190a32] text-white flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                Feel free to reach out to me through any of the following channels. I'd love to
                hear from you!
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-xl">📧</div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-300">harshil@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-xl">💼</div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-gray-300">linkedin.com/in/harshil</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-xl">💻</div>
                <div>
                  <p className="font-semibold">GitHub</p>
                  <p className="text-gray-300">github.com/harshil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactMe.displayName = 'ContactMe';

export default ContactMe;
