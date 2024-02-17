<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Poll;
use Illuminate\Support\Facades\Auth;

class PollController extends Controller
{
    // Menampilkan semua poll dalam format JSON
    public function index()
    {
        $polls = Poll::all();
        return response()->json($polls);
    }

    // Menyimpan poll baru ke database
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'deadline' => 'required',
            'division_id' => 'required|exists:divisions,id',
        ]);

        $user = Auth::user();

        $validatedData = $request->validated();
        $validatedData['created_by'] = $user->id;

        $poll = Poll::create($validatedData);

        return response()->json($poll, 201); // Memberikan respons dengan status code 201 (Created)
    }

    // Menampilkan detail sebuah poll dalam format JSON
    public function show(Poll $poll)
    {
        return response()->json($poll);
    }

    // Memperbarui poll yang telah diedit
    public function update(Request $request, Poll $poll)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'deadline' => 'required',
            'division_id' => 'required|exists:divisions,id',
        ]);

        $poll->update($request->all());

        return response()->json($poll, 200); // Memberikan respons dengan status code 200 (OK)
    }

    // Menghapus sebuah poll
    public function destroy(Poll $poll)
    {
        $poll->delete();

        return response()->json(null, 204); // Memberikan respons dengan status code 204 (No Content)
    }
}
