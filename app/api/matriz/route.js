import { NextResponse } from 'next/server';
import MatrizModel from '../../../models/matrizModel';

export async function GET() {
  try {
    const registros = await MatrizModel.getAll();
    return NextResponse.json(registros);
  } catch (error) {
    console.error('ERROR MATRIZ:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await MatrizModel.create(data);
    return NextResponse.json({ message: 'Registro creado con éxito' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}