<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::all();
        return Inertia::render('Notes/Index', compact('notes'));
    }

    public function create()
    {
        return Inertia::render('Notes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Note::create($validated);

        return redirect()->route('notes.index')->with('message', 'Note created successfully.');
    }
}
