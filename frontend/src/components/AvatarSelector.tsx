'use client';

import { useState, useRef } from 'react';

interface Avatar {
  emoji: string;
  name: string;
  color: string;
}

interface AvatarSelectorProps {
  avatars: Avatar[];
  selectedAvatar: string;
  uploadedImage: string | null;
  onSelectAvatar: (emoji: string) => void;
  onUploadImage: (imageUrl: string) => void;
}

export default function AvatarSelector({
  avatars,
  selectedAvatar,
  uploadedImage,
  onSelectAvatar,
  onUploadImage,
}: AvatarSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determinar si hay avatar seleccionado
  const hasSelection = selectedAvatar || uploadedImage;
  const selectedAvatarData = avatars.find(a => a.emoji === selectedAvatar);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeAvatar = () => {
    setIsExpanded(true);
  };

  const visibleAvatars = avatars.slice(0, 3);

  // Si hay selección, mostrar solo el avatar seleccionado centrado
  if (hasSelection) {
    return (
      <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px] py-4 md:py-8">
        <div className="flex flex-col items-center gap-4 md:gap-8 w-full px-4">
          {/* Avatar seleccionado centrado y grande */}
          <div className="flex flex-col items-center gap-2 md:gap-4">
            {uploadedImage ? (
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-4 md:ring-8 ring-primary border-2 md:border-4 border-white flex items-center justify-center">
                <img
                  src={uploadedImage}
                  alt="Tu foto"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full text-5xl md:text-9xl flex items-center justify-center transition-all shadow-2xl ring-4 md:ring-8 ring-primary border-2 md:border-4 border-white bg-gradient-to-br from-primary to-primary-dark">
                {selectedAvatar}
              </div>
            )}
            <h2 className="text-xl md:text-3xl font-bold text-primary text-center">
              {uploadedImage ? 'Tu Foto' : selectedAvatarData?.name}
            </h2>
            <p className="text-base md:text-lg text-text-secondary text-center">
              {uploadedImage ? '¡Tu foto ha sido seleccionada!' : '¡Excelente selección!'}
            </p>
          </div>

          {/* Botón para cambiar */}
          <button
            type="button"
            onClick={handleChangeAvatar}
            className="px-6 md:px-8 py-2 md:py-3 bg-secondary hover:bg-secondary-light text-primary font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
          >
            Cambiar Personaje
          </button>

          {/* Modal expandido que se muestra cuando quiere cambiar */}
          {isExpanded && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fadeIn w-[90%] max-w-[700px] max-h-[90vh] overflow-auto">
              <div className="bg-background-secondary rounded-3xl shadow-2xl p-4 md:p-10 border-4 border-primary relative overflow-hidden">
                {/* Decoraciones matemáticas de fondo - Reducidas en móvil */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.15] text-xs md:text-base">
                  {/* Ecuaciones y símbolos decorativos - Esquina superior izquierda */}
                  <div className="absolute top-6 left-10 text-5xl text-purple-500 font-bold rotate-12 animate-float-slow">
                    π
                  </div>
                  <div className="absolute top-16 left-24 text-2xl text-blue-400 font-bold -rotate-6">
                    3.14159...
                  </div>
                  
                  {/* Esquina superior derecha */}
                  <div className="absolute top-8 right-16 text-3xl text-blue-500 font-bold -rotate-12 animate-float-slow">
                    E=mc²
                  </div>
                  <div className="absolute top-24 right-8 text-4xl text-indigo-500 font-bold rotate-6">
                    ∫
                  </div>
                  
                  {/* Esquina inferior izquierda */}
                  <div className="absolute bottom-24 left-12 text-5xl text-pink-500 font-bold rotate-6 animate-float-slow">
                    ∑
                  </div>
                  <div className="absolute bottom-12 left-28 text-3xl text-red-400 font-bold -rotate-12">
                    Σ(1→n)
                  </div>
                  
                  {/* Esquina inferior derecha */}
                  <div className="absolute bottom-28 right-16 text-4xl text-green-500 font-bold -rotate-12 animate-float-slow">
                    √
                  </div>
                  <div className="absolute bottom-16 right-32 text-2xl text-teal-400 font-bold rotate-6">
                    √(x²+y²)
                  </div>
                  
                  {/* Centro izquierda */}
                  <div className="absolute top-1/3 left-6 text-4xl text-orange-500 font-bold rotate-45 animate-float-slow">
                    ∞
                  </div>
                  <div className="absolute top-1/2 left-12 text-2xl text-yellow-500 font-bold -rotate-12">
                    lim x→∞
                  </div>
                  
                  {/* Centro derecha */}
                  <div className="absolute top-1/3 right-12 text-3xl text-cyan-500 font-bold -rotate-12 animate-float-slow">
                    a²+b²=c²
                  </div>
                  <div className="absolute top-1/2 right-6 text-4xl text-violet-500 font-bold rotate-12">
                    θ
                  </div>
                  
                  {/* Centro superior */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 text-2xl text-amber-500 font-bold -rotate-6">
                    y=mx+b
                  </div>
                  
                  {/* Centro inferior */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-3xl text-rose-500 font-bold rotate-6">
                    ∂f/∂x
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-primary text-center mb-6 md:mb-8 relative z-10">
                  🎭 Elige tu personaje histórico
                </h3>
                
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 max-h-[500px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar relative z-10">
                  {/* Botón de subir imagen en el modal */}
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all border-2 md:border-4 shadow-lg hover:scale-110 text-sm md:text-base ${
                        uploadedImage
                          ? 'bg-primary ring-2 md:ring-4 ring-primary-light border-white'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-white'
                      }`}
                    >
                      {uploadedImage ? (
                        <img
                          src={uploadedImage}
                          alt="Avatar personalizado"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <>
                          <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-xs font-bold mt-0.5 md:mt-1">Subir</span>
                        </>
                      )}
                    </button>
                    <span className="text-xs md:text-sm text-text-secondary font-medium text-center leading-tight">
                      Tu Foto
                    </span>
                  </div>

                  {/* Todos los avatares */}
                  {avatars.map((avatar, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectAvatar(avatar.emoji);
                          setIsExpanded(false);
                        }}
                        className={`w-16 h-16 md:w-24 md:h-24 rounded-full text-3xl md:text-5xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg border-2 md:border-4 border-white ${
                          selectedAvatar === avatar.emoji && !uploadedImage
                            ? 'ring-2 md:ring-4 ring-primary'
                            : `${avatar.color} hover:shadow-xl`
                        }`}
                      >
                        {avatar.emoji}
                      </button>
                      <span className="text-xs md:text-sm text-text-secondary font-medium text-center leading-tight">
                        {avatar.name}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="mt-4 md:mt-8 w-full py-2 md:py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm md:text-lg rounded-xl transition-all shadow-lg hover:shadow-xl relative z-10"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Si no hay selección, mostrar los primeros 3 avatares
  return (
    <div className="flex justify-center items-center min-h-[200px] md:min-h-[250px] py-4 md:py-8 px-2">
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Contenedor principal centrado */}
        <div className="flex gap-2 md:gap-4 items-center justify-center flex-wrap md:flex-nowrap">
          {/* Botón para subir imagen */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all border-2 md:border-4 shadow-xl hover:scale-110 text-xs md:text-sm ${
              uploadedImage
                ? 'bg-primary ring-2 md:ring-4 ring-primary-light border-white'
                : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-white'
            }`}
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Avatar personalizado"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <>
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-white font-bold mt-0.5">Subir</span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Avatares visibles (3) */}
          {visibleAvatars.map((avatar, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelectAvatar(avatar.emoji)}
              className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full text-3xl md:text-5xl flex items-center justify-center transition-all transform hover:scale-110 shadow-xl border-2 md:border-4 border-white ${
                selectedAvatar === avatar.emoji && !uploadedImage
                  ? 'ring-2 md:ring-4 ring-primary'
                  : `${avatar.color} hover:shadow-2xl`
              }`}
              title={avatar.name}
            >
              {avatar.emoji}
            </button>
          ))}
        </div>

        {/* Modal expandido que sobresale */}
        {isExpanded && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fadeIn w-[700px]">
            <div className="bg-background-secondary rounded-3xl shadow-2xl p-10 border-4 border-primary relative overflow-hidden">
              {/* Decoraciones matemáticas de fondo */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.15]">
                {/* Ecuaciones y símbolos decorativos - Esquina superior izquierda */}
                <div className="absolute top-6 left-10 text-5xl text-purple-500 font-bold rotate-12 animate-float-slow">
                  π
                </div>
                <div className="absolute top-16 left-24 text-2xl text-blue-400 font-bold -rotate-6">
                  3.14159...
                </div>
                
                {/* Esquina superior derecha */}
                <div className="absolute top-8 right-16 text-3xl text-blue-500 font-bold -rotate-12 animate-float-slow">
                  E=mc²
                </div>
                <div className="absolute top-24 right-8 text-4xl text-indigo-500 font-bold rotate-6">
                  ∫
                </div>
                
                {/* Esquina inferior izquierda */}
                <div className="absolute bottom-24 left-12 text-5xl text-pink-500 font-bold rotate-6 animate-float-slow">
                  ∑
                </div>
                <div className="absolute bottom-12 left-28 text-3xl text-red-400 font-bold -rotate-12">
                  Σ(1→n)
                </div>
                
                {/* Esquina inferior derecha */}
                <div className="absolute bottom-28 right-16 text-4xl text-green-500 font-bold -rotate-12 animate-float-slow">
                  √
                </div>
                <div className="absolute bottom-16 right-32 text-2xl text-teal-400 font-bold rotate-6">
                  √(x²+y²)
                </div>
                
                {/* Centro izquierda */}
                <div className="absolute top-1/3 left-6 text-4xl text-orange-500 font-bold rotate-45 animate-float-slow">
                  ∞
                </div>
                <div className="absolute top-1/2 left-12 text-2xl text-yellow-500 font-bold -rotate-12">
                  lim x→∞
                </div>
                
                {/* Centro derecha */}
                <div className="absolute top-1/3 right-12 text-3xl text-cyan-500 font-bold -rotate-12 animate-float-slow">
                  a²+b²=c²
                </div>
                <div className="absolute top-1/2 right-6 text-4xl text-violet-500 font-bold rotate-12">
                  θ
                </div>
                
                {/* Centro superior */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 text-2xl text-amber-500 font-bold -rotate-6">
                  y=mx+b
                </div>
                
                {/* Centro inferior */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-3xl text-rose-500 font-bold rotate-6">
                  ∂f/∂x
                </div>
                
                {/* Gráfica parabólica - Superior derecha */}
                <svg className="absolute top-12 right-1/4 w-28 h-28 text-indigo-400 opacity-60" viewBox="0 0 100 100">
                  <path d="M 10 90 Q 30 10, 50 50 T 90 10" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                  <circle cx="10" cy="90" r="3" fill="currentColor"/>
                  <circle cx="50" cy="50" r="3" fill="currentColor"/>
                  <circle cx="90" cy="10" r="3" fill="currentColor"/>
                  {/* Ejes */}
                  <line x1="5" y1="95" x2="95" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <line x1="5" y1="5" x2="5" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                </svg>
                
                {/* Gráfica lineal - Inferior izquierda */}
                <svg className="absolute bottom-20 left-1/4 w-24 h-24 text-red-400 opacity-60" viewBox="0 0 100 100">
                  <line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" strokeWidth="2.5"/>
                  <circle cx="10" cy="90" r="3" fill="currentColor"/>
                  <circle cx="90" cy="10" r="3" fill="currentColor"/>
                  {/* Ejes */}
                  <line x1="5" y1="95" x2="95" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <line x1="5" y1="5" x2="5" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                </svg>
                
                {/* Triángulo de Pitágoras - Superior izquierda */}
                <svg className="absolute top-1/4 left-1/4 w-20 h-20 text-teal-400 opacity-50" viewBox="0 0 100 100">
                  <polygon points="10,90 10,30 70,90" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                  <text x="15" y="60" fontSize="12" fill="currentColor">a</text>
                  <text x="35" y="95" fontSize="12" fill="currentColor">b</text>
                  <text x="40" y="65" fontSize="12" fill="currentColor">c</text>
                </svg>
                
                {/* Círculo unitario - Inferior derecha */}
                <svg className="absolute bottom-1/4 right-1/4 w-24 h-24 text-violet-400 opacity-50" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="50" y1="50" x2="78" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
                  <circle cx="78" cy="28" r="2" fill="currentColor"/>
                </svg>
                
                {/* Gráfica de barras - Centro */}
                <svg className="absolute top-1/2 left-1/3 w-20 h-20 text-emerald-400 opacity-50" viewBox="0 0 100 100">
                  <rect x="10" y="60" width="15" height="30" fill="currentColor"/>
                  <rect x="30" y="40" width="15" height="50" fill="currentColor"/>
                  <rect x="50" y="50" width="15" height="40" fill="currentColor"/>
                  <rect x="70" y="30" width="15" height="60" fill="currentColor"/>
                  <line x1="5" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-primary text-center mb-8 relative z-10">
                🎭 Elige tu personaje histórico
              </h3>
              
              <div className="grid grid-cols-4 gap-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar relative z-10">
                {/* Botón de subir imagen en el modal */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all border-4 shadow-lg hover:scale-110 ${
                      uploadedImage
                        ? 'bg-primary ring-4 ring-primary-light border-white'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-white'
                    }`}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Avatar personalizado"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xs text-white font-bold mt-1">Subir</span>
                      </>
                    )}
                  </button>
                  <span className="text-sm text-text-secondary font-medium text-center">
                    Tu Foto
                  </span>
                </div>

                {/* Todos los avatares */}
                {avatars.map((avatar, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAvatar(avatar.emoji);
                        setIsExpanded(false);
                      }}
                      className={`w-24 h-24 rounded-full text-5xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg ${
                        selectedAvatar === avatar.emoji && !uploadedImage
                          ? 'ring-4 ring-primary border-4 border-white'
                          : `${avatar.color} border-4 border-white hover:shadow-xl`
                      }`}
                    >
                      {avatar.emoji}
                    </button>
                    <span className="text-sm text-text-secondary font-medium text-center leading-tight">
                      {avatar.name}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="mt-8 w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl relative z-10"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Indicador de más avatares */}
        {!isExpanded && (
          <div className="absolute -bottom-10 md:-bottom-12 left-0 right-0 text-center">
            <p className="text-xs md:text-sm text-text-secondary animate-pulse">
              ✨ Pasa el mouse para ver todos los personajes ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
