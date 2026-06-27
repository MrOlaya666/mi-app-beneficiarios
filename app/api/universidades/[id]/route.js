// app/api/universidades/[id]/route.js
import { NextResponse } from 'next/server';
import UniversidadModel from '../../../../models/universidadModel';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { Codigo_SNIES, Nombre_IES } = await request.json();
    await UniversidadModel.update(id, Codigo_SNIES, Nombre_IES);
    return NextResponse.json({ message: 'Universidad actualizada con éxito' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await UniversidadModel.delete(id);
    return NextResponse.json({ message: 'Universidad eliminada con éxito' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}