import React, { useState, useEffect } from 'react';
import { ShoppingBag, Moon, Sun, Menu, X, User, LogOut, Lock, Check, LayoutDashboard } from 'lucide-react';
import { initialProducts } from './data';
import { Product, Category } from './types';
import ProductCard from './components/ProductCard';
import OrderModal from './components/OrderModal';

// --- Types specific to App State ---
type ViewState = 'home' | 'admin-login' | 'admin-dashboard';

const App: React.FC = () => {
  // --- State ---
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark as requested "Rosa e Preto"
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [view, setView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Admin State
  const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // --- Effects ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- Handlers ---
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories: Category[] = ['Todos', 'Roupas', 'Calçados', 'Bolsas', 'Relógios', 'Acessórios'];

  // Admin Logic
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCreds.username === 'Edivina17' && adminCreds.password === '932ed$#') {
      setIsAdminLoggedIn(true);
      setView('admin-dashboard');
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas.');
    }
  };

  const toggleProductAvailability = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, isSoldOut: !p.isSoldOut } : p));
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminCreds({ username: '', password: '' });
    setView('home');
  };

  // --- Render Helpers ---
  
  const renderHeader = () => (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex flex-col cursor-pointer" onClick={() => setView('home')}>
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-primary-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Moda<span className="text-primary-600">Flex</span>
              </span>
            </div>
            <span className="text-[0.65rem] text-gray-500 dark:text-gray-400 font-medium tracking-widest ml-8 -mt-1">
              EDIVINA COMPANY
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.slice(0, 4).map(cat => (
               <button 
                key={cat}
                onClick={() => { setSelectedCategory(cat); setView('home'); }}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${selectedCategory === cat && view === 'home' ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300'}`}
               >
                 {cat}
               </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-gray-300">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAdminLoggedIn ? (
              <button 
                onClick={() => setView(view === 'admin-dashboard' ? 'home' : 'admin-dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-primary-600/10 text-primary-600 rounded-full border border-primary-600/20 hover:bg-primary-600 hover:text-white transition-all"
              >
                <User size={14} /> {view === 'admin-dashboard' ? 'Loja' : 'Admin'}
              </button>
            ) : (
               <button 
                 onClick={() => setView('admin-login')}
                 className="text-xs text-gray-400 hover:text-primary-500 transition-colors flex items-center gap-1"
               >
                 <Lock size={12} /> Área Administrativa
               </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                   setSelectedCategory(cat);
                   setView('home');
                   setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary-500"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  // --- Views ---

  const HomeView = () => (
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600" 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-start justify-center min-h-[50vh]">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Estilo que define <span className="text-primary-500">você</span>.
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mb-8">
            Explore nossa nova coleção de roupas, calçados e acessórios. Qualidade premium com entrega rápida.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('products-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full shadow-lg hover:shadow-primary-600/50 transition-all transform hover:-translate-y-1"
          >
            Ver Coleção
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div id="products-section" className="bg-white dark:bg-[#121212] py-10 border-b border-gray-100 dark:border-zinc-800 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nossos Produtos</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                  ${selectedCategory === cat 
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25' 
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOrder={handleOrderClick} 
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>
    </main>
  );

  const AdminLoginView = () => (
    <div className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-black/50">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-zinc-800">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
             <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Área Administrativa</h2>
          <p className="text-sm text-gray-500 mt-2">Edivina Company</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuário</label>
            <input 
              type="text" 
              value={adminCreds.username}
              onChange={e => setAdminCreds({...adminCreds, username: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="Nome de usuário"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
            <input 
              type="password" 
              value={adminCreds.password}
              onChange={e => setAdminCreds({...adminCreds, password: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          
          {loginError && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
              {loginError}
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg transition-colors"
          >
            Entrar
          </button>
          
          <button 
            type="button"
            onClick={() => setView('home')}
            className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-center"
          >
            Voltar para a Loja
          </button>
        </form>
      </div>
    </div>
  );

  const AdminDashboardView = () => (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <LayoutDashboard className="text-primary-600" /> Painel de Controle
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie o estoque da ModaFlex</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Lista de Produtos</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-zinc-800">
          {products.map(product => (
            <div key={product.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.category} • {product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${product.isSoldOut ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                    {product.isSoldOut ? 'Esgotado' : 'Disponível'}
                 </span>
                 <button 
                   onClick={() => toggleProductAvailability(product.id)}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${product.isSoldOut 
                     ? 'border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20' 
                     : 'border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20'}`}
                 >
                   {product.isSoldOut ? 'Marcar Disponível' : 'Marcar Esgotado'}
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {renderHeader()}
      
      {view === 'home' && <HomeView />}
      {view === 'admin-login' && <AdminLoginView />}
      {view === 'admin-dashboard' && isAdminLoggedIn && <AdminDashboardView />}
      {/* Redirect if dashboard access without login */}
      {view === 'admin-dashboard' && !isAdminLoggedIn && <AdminLoginView />}

      {/* Footer */}
      <footer className="bg-white dark:bg-[#050505] py-12 border-t border-gray-200 dark:border-zinc-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-1">
                Moda<span className="text-primary-600">Flex</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Edivina Company</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
              <p>&copy; 2025 Todos os direitos reservados.</p>
              <div className="flex gap-4 mt-2 justify-center md:justify-end">
                <a href="#" className="hover:text-primary-500 transition-colors"><Check size={16} /></a>
                {/* Icons for social mock */}
                <svg className="w-4 h-4 hover:text-primary-500 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08v.001zm0-2c-2.705 0-3.04.011-4.1.06-1.065.048-1.79.217-2.468.48-1.689.65-2.884 1.844-3.534 3.534-.263.678-.433 1.403-.481 2.468-.049 1.06-.06 1.395-.06 4.1 0 2.705.011 3.04.06 4.1.048 1.065.217 1.79.48 2.468.65 1.689 1.844 2.884 3.534 3.534.678.263 1.403.433 2.468.481 1.06.049 1.395.06 4.1.06 2.705 0 3.04-.011 4.1-.06 1.065-.048 1.79-.217 2.468-.48 1.689-.65 2.884-1.844 3.534-3.534.263-.678.433-1.403.481-2.468.049-1.06.06-1.395.06-4.1s-.011-3.04-.06-4.1c-.048-1.065-.217-1.79-.48-2.468-.65-1.689-2.884-2.884-3.534-3.534-.678-.263-1.403-.433-2.468-.481-1.06-.049-1.395-.06-4.1-.06zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.315 16.34a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm6.576-6.826a1.333 1.333 0 110-2.667 1.333 1.333 0 010 2.667z" clipRule="evenodd" />
                </svg>
                <svg className="w-4 h-4 hover:text-primary-500 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <svg className="w-4 h-4 hover:text-primary-500 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <button onClick={() => setView('admin-login')} className="text-xs opacity-50 hover:opacity-100 flex items-center gap-1"><Lock size={10}/> Área Administrativa</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default App;