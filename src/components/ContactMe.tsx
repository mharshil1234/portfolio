'use client';

import React, { forwardRef, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Toast } from './Toast';
import { sendEmail } from '@/lib/actions/send-email';

const ContactMe = forwardRef<HTMLElement>((_, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | null;
    message: string;
  }>({ isOpen: false, type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setToastState({ isOpen: false, type: null, message: '' });

    const result = await sendEmail(formData);

    if (result.success) {
      setToastState({ isOpen: true, type: 'success', message: result.message as string });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setToastState({ isOpen: true, type: 'error', message: result.error as string });
    }

    setLoading(false);
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center py-20"
    >
      <Toast
        isOpen={toastState.isOpen}
        type={toastState.type as 'success' | 'error'}
        message={toastState.message}
        onClose={() => setToastState({ isOpen: false, type: null, message: '' })}
        duration={4000}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:ring-opacity-50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:ring-opacity-50 transition-all"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:ring-opacity-50 transition-all h-32 resize-none"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all hover:cursor-pointer"
              >
                {loading ? 'Sending...' : 'Send Message'}
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
              <a
                href="mailto:mharshil1234@gmail.com"
                className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-purple-600 hover:translate-x-2 transition-all hover:shadow-lg hover:shadow-purple-900/50"
              >
                <HiOutlineMail className="text-2xl text-purple-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-400 hover:text-purple-400 transition-colors">mharshil1234@gmail.com</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/harshil-maheshwari/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-600 hover:translate-x-2 transition-all hover:shadow-lg hover:shadow-blue-900/50"
              >
                <FaLinkedin className="text-2xl text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">LinkedIn</p>
                  <p className="text-gray-400 hover:text-blue-400 transition-colors">linkedin.com/in/harshil-maheshwari/</p>
                </div>
              </a>
              <a
                href="https://github.com/mharshil1234"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-600 hover:translate-x-2 transition-all hover:shadow-lg hover:shadow-gray-800/50"
              >
                <FaGithub className="text-2xl text-gray-300 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">GitHub</p>
                  <p className="text-gray-400 hover:text-gray-300 transition-colors">github.com/mharshil1234</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactMe.displayName = 'ContactMe';

export { ContactMe };