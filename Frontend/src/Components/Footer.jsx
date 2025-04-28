const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-[#fff2ff]/30 via-white to-[#fffff8]/30 py-6 shadow-inner backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 px-4">
          <p className="mb-2">
            🚀 Powered by <span className="text-[#e87c21] font-semibold">Foodies</span> • Bringing your cravings closer!
          </p>
          <p>© {new Date().getFullYear()} Foodies. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  