import React, { useState } from 'react';
import { X, Plus, Image, Video, Tag, DollarSign, FileText, Upload, Package } from 'lucide-react';
import { Product, Category } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Roupas' as Category,
    image: '',
    video: '',
    description: '',
    stock: '1',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create a fake local URL for preview and usage
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setFormData(prev => ({ ...prev, image: objectUrl }));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, video: objectUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Se nenhuma imagem foi selecionada, usa um placeholder ou força o usuário a selecionar
    const finalImage = formData.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600";

    onAdd({
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: finalImage,
      video: formData.video || undefined,
      description: formData.description,
      isSoldOut: false,
      stock: Number(formData.stock)
    });
    onClose();
    // Reset form
    setFormData({
      name: '',
      price: '',
      category: 'Roupas',
      image: '',
      video: '',
      description: '',
      stock: '1'
    });
    setImageFile(null);
    setVideoFile(null);
    setPreviewImage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-800/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Plus className="text-primary-600" size={20} /> Adicionar Novo Produto
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Produto</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Ex: Vestido Floral"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Preço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <DollarSign size={14}/> Preço (KZ)
                </label>
                <input 
                  required
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="0"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <Tag size={14}/> Categoria
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {['Roupas', 'Calçados', 'Bolsas', 'Relógios', 'Acessórios'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estoque */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <Package size={14}/> Quantidade em Estoque
              </label>
              <input 
                required
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="1"
              />
            </div>

            {/* Upload Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <Image size={14}/> Fotografia do Produto
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-zinc-700 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors relative">
                {previewImage ? (
                  <div className="text-center">
                    <img src={previewImage} alt="Preview" className="mx-auto h-32 object-cover rounded-md mb-2" />
                    <p className="text-xs text-green-500">Imagem carregada</p>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Carregar arquivo</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Video */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <Video size={14}/> Vídeo do Produto (Opcional)
              </label>
              <div className="flex items-center gap-2">
                 <input 
                  type="file" 
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-50 file:text-primary-700
                    hover:file:bg-primary-100
                    dark:file:bg-zinc-800 dark:file:text-primary-500
                  "
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Vídeos curtos de até 30 segundos recomendados.</p>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <FileText size={14}/> Descrição
              </label>
              <textarea 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                placeholder="Detalhes do produto..."
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all mt-4"
            >
              Salvar Produto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;