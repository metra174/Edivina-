import React from 'react';
import { Product } from '../types';
import { ShoppingBag, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrder }) => {
  return (
    <div className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-zinc-800">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 ${product.isSoldOut ? 'grayscale opacity-60' : ''}`}
        />
        
        {/* Badges */}
        {product.isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
             <div className="border-2 border-white text-white px-4 py-1 text-lg font-bold uppercase tracking-widest -rotate-12 backdrop-blur-sm">
               Esgotado
             </div>
          </div>
        )}
        
        {!product.isSoldOut && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button 
               onClick={() => onOrder(product)}
               className="bg-white dark:bg-zinc-800 text-primary-600 p-3 rounded-full shadow-lg hover:bg-primary-50 dark:hover:bg-zinc-700 transition-colors"
               title="Encomendar agora"
             >
               <ShoppingBag size={20} />
             </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
          </span>
          
          <button
            onClick={() => !product.isSoldOut && onOrder(product)}
            disabled={product.isSoldOut}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2
              ${product.isSoldOut 
                ? 'bg-gray-200 dark:bg-zinc-800 text-gray-500 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20'
              }`}
          >
            {product.isSoldOut ? (
              <>
                <AlertCircle size={16} /> Indisponível
              </>
            ) : (
              <>
                Encomendar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;