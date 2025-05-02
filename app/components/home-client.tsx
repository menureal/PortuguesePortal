'use client';

import React, { useEffect } from 'react';
import SearchFilters from "./search-filters";

export default function HomeClient() {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  // Inicializar o WebSocket quando o componente carrega
  useEffect(() => {
    // Inicializar o servidor WebSocket fazendo uma requisição GET para a rota
    fetch('/api/ws')
      .then(response => {
        console.log('WebSocket API initialized:', response.status);
      })
      .catch(error => {
        console.error('Error initializing WebSocket API:', error);
      });
  }, []);

  return (
    <SearchFilters onSearch={handleSearch} />
  );
}