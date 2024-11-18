import React from 'react';

const Map = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <iframe
        title="Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.56304270312737!2d72.64907621797032!3d23.15850403276892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e81003ebae01b%3A0xafbe245079faf16f!2sHappiness%20PDPU!5e0!3m2!1sen!2sin!4v1731317537970!5m2!1sen!2sin"
        width="100%"
        height="200"
        style={{ border: '0', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Map;
