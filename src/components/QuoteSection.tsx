import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface QuoteSectionProps {
  quote: string;
  author: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ quote, author }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [displayedQuote, setDisplayedQuote] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      startTypewriter();
    }
  }, [controls, inView]);

  const startTypewriter = () => {
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedQuote(quote.substring(0, i));
      i++;
      if (i > quote.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-dark-900 to-dark-800"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative">
          <div className="text-5xl text-blue-500/20 absolute top-0 left-0">"</div>
          <blockquote className="relative z-10 text-xl md:text-2xl lg:text-3xl font-exo font-light italic text-gray-100 leading-relaxed">
            {displayedQuote}
            {isTyping && (
              <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-blue-500"></span>
            )}
          </blockquote>
          <div className="text-5xl text-blue-500/20 absolute bottom-0 right-0">"</div>
        </div>
        
        <motion.div
          className="mt-6 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <cite className="text-blue-500 font-medium not-italic">— {author}</cite>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default QuoteSection;