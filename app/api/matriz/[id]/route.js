// app/api/matriz/[id]/route.js
import { NextResponse } from 'next/server';
import MatrizModel from '../../../../models/matrizModel';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await MatrizModel.delete(id);
    return NextResponse.json({ message: 'Registro eliminado con éxito' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}