// app/api/catalogos/route.js
import { NextResponse } from 'next/server';
import MatrizModel from '../../../models/matrizModel';

export async function GET() {
  try {
    const catalogos = await MatrizModel.getCatalogos();
    return NextResponse.json(catalogos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener catálogos' }, { status: 500 });
  }
}