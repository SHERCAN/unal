// src/app/api/[...slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

export async function POST(req: NextRequest) {
  return proxyRequest(req);
}

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}

async function proxyRequest(req: NextRequest) {
  const slug = req.nextUrl.pathname.replace('/api/', '');
  const searchParams = req.nextUrl.searchParams.toString();
  const url = `${API_URL}/${slug}${searchParams ? `?${searchParams}` : ''}`;

  console.log(`Proxying request to: ${url}`);
  console.log(`Method: ${req.method}`);
  console.log(`Range header: ${req.headers.get('range') || 'none'}`);

  try {
    // Forward incoming headers (except hop-by-hop and host)
    const forwardedHeaders: Record<string, string> = {};
    for (const [key, value] of req.headers.entries()) {
      const k = key.toLowerCase();
      // No excluyas estos headers importantes para video streaming
      if (['host', 'connection', 'content-length'].includes(k)) continue;
      if (value) forwardedHeaders[k] = value;
    }

    // IMPORTANTE: Preservar el header Range para video streaming
    const rangeHeader = req.headers.get('range');
    if (rangeHeader) {
      forwardedHeaders['range'] = rangeHeader;
      console.log('Range request detected:', rangeHeader);
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: forwardedHeaders,
      // Importante para streaming
      cache: 'no-store',
    };

    // Get the body only if the method requires it
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      try {
        const text = await req.text();
        if (text) fetchOptions.body = text;
      } catch (e) {
        console.error('Error leyendo body:', e);
      }
    }

    // Make request to backend
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get('content-type') || '';

    console.log(`Backend response status: ${response.status}`);
    console.log(`Backend content-type: ${contentType}`);

    // If JSON response, parse and return as JSON
    if (contentType.includes('application/json')) {
      try {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch (e) {
        console.error('Error parseando JSON de respuesta:', e);
        return NextResponse.json(
          { error: 'Respuesta inválida del servidor' },
          { status: response.status }
        );
      }
    }

    // Para contenido binario (videos, imágenes, etc.)
    const respHeaders: Record<string, string> = {};
    response.headers.forEach((v, k) => {
      const kLower = k.toLowerCase();
      // No excluir headers importantes para streaming
      if (['connection', 'transfer-encoding', 'keep-alive'].includes(kLower)) return;
      respHeaders[k] = v;
    });

    // CRÍTICO: Preservar headers esenciales para video streaming
    if (response.headers.has('content-range')) {
      respHeaders['content-range'] = response.headers.get('content-range')!;
      console.log('Content-Range:', respHeaders['content-range']);
    }
    if (response.headers.has('accept-ranges')) {
      respHeaders['accept-ranges'] = response.headers.get('accept-ranges')!;
    }
    if (response.headers.has('content-length')) {
      respHeaders['content-length'] = response.headers.get('content-length')!;
    }

    // Añadir CORS headers si es necesario
    respHeaders['Access-Control-Allow-Origin'] = '*';
    respHeaders['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    respHeaders['Access-Control-Allow-Headers'] = 'Content-Type, Range';

    // Stream la respuesta directamente (para videos, imágenes, etc.)
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders,
    });

  } catch (error) {
    console.error('Error en proxy:', error);

    return NextResponse.json(
      {
        error: 'Error del proxy',
        details: error instanceof Error ? error.message : 'Error desconocido',
        url: url
      },
      { status: 500 }
    );
  }
}

// Manejar OPTIONS para CORS preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Range',
      'Access-Control-Max-Age': '86400',
    },
  });
}