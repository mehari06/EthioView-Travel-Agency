import Navigation from './Navigation';
import Logo from './Logo';

function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-nav'>
      <div className='flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
