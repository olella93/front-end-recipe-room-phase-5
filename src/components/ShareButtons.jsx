

import React, { useState, useRef, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';

function ShareButtons({ url, title, description }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || document.title);
  const encodedDesc = encodeURIComponent(description || '');

  const links = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600',
      icon: <FaFacebookF size={20} />,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-blue-400',
      icon: <FaTwitter size={20} />,
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-500',
      icon: <FaWhatsapp size={20} />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      color: 'bg-pink-500',
      icon: <FaInstagram size={20} />,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/',
      color: 'bg-black',
      icon: <FaTiktok size={20} />,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-6 py-3 rounded-lg font-bold text-lg shadow bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-150"
        style={{ minWidth: '140px' }}
      >
        Share
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-48 bg-white rounded-lg shadow-lg border border-orange-100 flex flex-col py-2 animate-fade-in">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white ${l.color} hover:opacity-90 rounded transition mb-1 last:mb-0`}
              style={{ display: 'block' }}
              title={l.name}
            >
              {l.icon}
              <span className="sr-only">{l.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShareButtons;