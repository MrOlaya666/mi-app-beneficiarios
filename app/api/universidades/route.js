// app/api/universidades/route.js
import { NextResponse } from 'next/server';
import UniversidadModel from '../../../models/universidadModel';

export async function GET() {
  try {
    const universidades = await UniversidadModel.getAll();
    return NextResponse.json(universidades);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener universidades' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { Codigo_SNIES, Nombre_IES } = await request.json();
    await UniversidadModel.create(Codigo_SNIES, Nombre_IES);
    return NextResponse.json({ message: 'Universidad creada con éxito' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear universidad' }, { status: 500 });
  }
}