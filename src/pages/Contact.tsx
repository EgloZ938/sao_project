import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, AlertTriangle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally would send to a backend
    // For demo purposes, just simulate success
    setFormStatus('success');
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-exo font-bold text-white mb-6">
              <span className="text-blue-500">CONTACT</span> US
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about Aincrad or want to contribute to this fan site?
              We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-dark-900">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-exo font-bold text-white mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-300 mb-8">
                This site is a fan project dedicated to the Sword Art Online series.
                We welcome feedback, suggestions, and collaboration opportunities from
                fellow fans.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 border border-blue-500/50">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Email Us</h3>
                    <p className="text-gray-400">
                      contact@sao-aincrad-fansite.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 border border-blue-500/50">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Discord</h3>
                    <p className="text-gray-400">
                      Join our Discord community!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 border border-blue-500/50">
                    <AlertTriangle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Disclaimer</h3>
                    <p className="text-gray-400">
                      This is a fan site. SAO and all related properties are owned by
                      A-1 Pictures, Aniplex, and Reki Kawahara.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {formStatus === 'success' ? (
                <div className="bg-dark-800 p-8 rounded-lg border border-blue-500/30 shadow-lg h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/50">
                    <Send className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-exo font-bold text-white mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-dark-800 p-8 rounded-lg border border-gray-800 shadow-lg"
                >
                  <h3 className="text-2xl font-exo font-bold text-white mb-6">
                    Send a Message
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;