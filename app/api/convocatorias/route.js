// app/api/convocatorias/route.js
import { NextResponse } from 'next/server';
import ConvocatoriaModel from '../../../models/convocatoriaModel';

export async function GET() {
  try {
    const convocatorias = await ConvocatoriaModel.getAll();
    return NextResponse.json(convocatorias);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener convocatorias' }, { status: 500 });
  }
}