"use client";

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function DonatePage() {
  const { t } = useLanguageStore();
  const [amount, setAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !formData.name || !formData.email) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);
    setStatusText('Submitting your donation...');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('amount', amount);
      if (formData.purpose) data.append('purpose', formData.purpose);
      if (imageFile) data.append('image', imageFile);

      // We use the provided endpoint path. As requested, this goes to POST /donations but we hit full URL if needed
      // Assuming the backend is hosted at NEXT_PUBLIC_API_URL or relative /api/donations.
      // Since it's a general request, we use the relative path (can be proxied or adjusted later)
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${baseUrl}/donations`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit donation');
      }

      setIsSuccess(true);
      setStatusText('');
    } catch (error: any) {
      alert(error.message || "An error occurred");
      setStatusText('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Empower Our Future', pcm: 'Support Di Movement', ig: 'Kwado Ọhụụ Anyị', ha: 'Tallafa Wa Hangen Nesa', yo: 'Ṣe Àtìlẹyìn Ìran Naa' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Make a Donation
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Your generous contributions go a long way in supporting our community projects and driving impact where it matters most.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_1.5fr] gap-12">
          
          {/* Bank Transfer Details */}
          <div className="space-y-8">
            <div className="bg-[var(--midnight-green)] p-10 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-2xl font-bold font-serif mb-6 flex items-center gap-3 relative z-10">
                <span className="material-symbols-outlined text-[var(--sunlight-yellow)]">account_balance</span>
                Bank Details
              </h2>
              
              <p className="text-white/70 font-light leading-relaxed mb-8 relative z-10 text-sm">
                Please make your donation via a direct bank transfer to the account below, then upload the payment receipt on the form.
              </p>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Bank Name</p>
                  <p className="text-lg font-medium text-white">Guaranty Trust Bank (GTB)</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Account Name</p>
                  <p className="text-lg font-medium text-white">Uchenna Okonkwo Support Fund</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl flex justify-between items-center border border-white/10 hover:border-white/30 transition-all">
                  <div>
                    <p className="text-[10px] text-[var(--sunlight-yellow)] uppercase tracking-widest font-bold mb-1">Account Number</p>
                    <p className="text-3xl font-bold tracking-wider font-mono">0123456789</p>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText('0123456789')}
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--sunlight-yellow)]/20 hover:text-[var(--sunlight-yellow)] transition-all cursor-pointer"
                    title="Copy Account Number"
                  >
                    <span className="material-symbols-outlined text-lg">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <section className="bg-white p-10 lg:p-12 rounded-3xl border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-6 animate-fade-in">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
                </div>
                <h3 className="text-3xl font-bold font-serif text-[var(--obsidian)]">Thank You!</h3>
                <p className="text-gray-500 max-w-sm">We have received your donation details successfully. We truly appreciate your support!</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-8 py-3 bg-[var(--midnight-green)] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--obsidian)] transition-all"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--midnight-green)]">receipt_long</span>
                  Confirm Donation
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Amount Grid */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Amount Donated (NGN) <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {['10000', '50000', '100000'].map((val) => (
                        <button 
                          key={val} 
                          type="button"
                          onClick={() => setAmount(val)}
                          className={`py-3 rounded-xl border text-sm font-bold transition-all ${amount === val ? 'bg-green-50 text-green-700 border-green-200 shadow-sm' : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}
                        >
                          ₦{parseInt(val).toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                      <input 
                        type="number" 
                        placeholder="Other Amount" 
                        value={amount}
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-5 py-4 text-sm font-medium focus:outline-none focus:border-[var(--midnight-green)] focus:ring-1 focus:ring-[var(--midnight-green)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--midnight-green)] focus:bg-white transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--midnight-green)] focus:bg-white transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Purpose of Donation (Optional)</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--midnight-green)] focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Select a purpose...</option>
                      <option value="General Support">General Support</option>
                      <option value="Education Fund">Education Fund</option>
                      <option value="Health Program">Community Health Program</option>
                      <option value="Campaign">Campaign Contributions</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Payment Receipt or Photo (Optional)</label>
                    <p className="text-xs text-gray-400 mb-3">Accepts JPG, PNG, WEBP. Max size: 5MB.</p>
                    
                    {!imagePreview ? (
                      <div 
                        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--midnight-green)] hover:bg-[var(--midnight-green)]/5 transition-all cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-[var(--midnight-green)] mb-3">cloud_upload</span>
                        <p className="text-sm font-medium text-gray-600">Click to upload receipt</p>
                      </div>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={removeImage}
                            className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png, image/webp"
                      className="hidden"
                    />
                  </div>
                  
                  <button 
                    disabled={isLoading}
                    className="w-full bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all shadow-lg flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">{statusText || 'Processing...'}</span>
                    ) : (
                      <>
                        Submit Donation Request
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
                      </>
                    )}
                  </button>
                  
                </form>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
