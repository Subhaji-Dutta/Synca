export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-[#BCBCBC] py-10 text-sm text-center">
      <div className="px-10 mx-auto">
        <div className="flex flex-col items-center gap-8">
        <img src="/assets/logosaas.png" alt="Saas" className="w-10 h-10"/>
        <nav className="flex flex-wrap justify-center items-center text-lg font-medium">
          <a href="#" className="mr-5">About</a>
          <a href="#" className="mr-5">Features</a>
          <a href="#" className="mr-5">Customers</a>
          <a href="#" className="mr-5">Pricing</a>
          <a href="#" className="mr-5">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="flex justify-center items-center gap-8">
          <img src="/assets/youtube.svg" alt="Youtube" className="w-6 h-6"/>
          <img src="/assets/linkedIn.svg" alt="LinkedIn" className="w-6 h-6"/>
          <img src="/assets/insta.svg" alt="Instagram" className="w-6 h-6"/>
          <img src="/assets/pin.svg" alt="Pinterest" className="w-6 h-6"/>
          <img src="/assets/x.svg" alt="X" className="w-6 h-6"/>
        </div>
        <p className="text-[#777777] text-lg">Copyright © 2025 SD. All rights reserved.</p>
      </div>
      </div>
    </footer>
  )
};
