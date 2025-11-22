import React, { useState } from 'react';
import { Product, WHATSAPP_NUMBER } from '../types';
import { X, Smartphone, Send, User, Mail } from 'lucide-react';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const message = `Olá ModaFlex, meu nome é *${formData.name}*.\n\nGostaria de encomendar o produto:\n*${product.name}* (${product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })})\n\nMeus dados de contato:\nEmail: ${formData.email}\nTelefone: ${formData.phone}`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        {/* Header */}
        <div className="relative h-32 bg-primary-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <p className="text-sm opacity-90 uppercase tracking-wider font-bold">Encomendar</p>
            <h3 className="text-2xl font-bold truncate max-w-[300px]">{product.name}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User size={16} className="text-primary-500" /> Nome Completo
              </label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="Seu nome"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail size={16} className="text-primary-500" /> Email
              </label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Smartphone size={16} className="text-primary-500" /> WhatsApp / Telefone
              </label>
              <input 
                required
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="+244 9XX XXX XXX"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-green-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Confirmar no WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Você será redirecionado para o WhatsApp para finalizar.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;